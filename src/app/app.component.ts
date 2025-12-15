import { Component } from '@angular/core';
import { ProductosService } from './productos.service';
import { ClientesService } from './clientes.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularmvvm';
  usuarios: any[] = [];
  productos: any[] = [];
  clientes: any[] = [];
  error: string | null = null;
  data: any;  // Variable para almacenar los datos
  loading: boolean = true;  // Indicador de carga


  constructor(private productosService: ProductosService,private clientesService:ClientesService) {}


ngOnInit() {
    this.getProductos(); 
    this.getClientes(); // Cargar los datos cuando el componente se inicializa
  }


  getProductos(): void {
    this.productosService.getData().subscribe({
      next: (data: any) => {
        this.productos = data;  // Asignar los datos de productos
        this.data = data;  // Asignar la respuesta a la variable 'data'
        this.loading = false;   // Detener el indicador de carga
      },
      error: (err: any) => {
        this.error = 'Error al cargar productos';  // Manejar errores
        console.error(err);
      }
    });
}

getClientes(): void {
    this.clientesService.getData('clientes').subscribe({
      next: (data: any) => {
        this.clientes = data;  // Asignar los datos de productos
        this.data = data;  // Asignar la respuesta a la variable 'data'
        this.loading = false;   // Detener el indicador de carga
      },
      error: (err: any) => {
        this.error = 'Error al cargar productos';  // Manejar errores
        console.error(err);
      }
    });
}













}
