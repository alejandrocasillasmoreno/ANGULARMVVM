import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  productos: any[] = [];
  loading = false;
  error = '';
  
  // Añadir estas propiedades para el formulario
  myForm: FormGroup;
  editing = false;
  editingId?: number;

  constructor(
    private productosService: ProductosService,
    private fb: FormBuilder
  ) {
    // Inicializar formulario
    this.myForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.productosService.getData().subscribe({
      next: (data: any[]) => {
        this.productos = data;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Error al cargar productos';
        this.loading = false;
        console.error(error);
      }
    });
  }

  // Método para guardar producto (crear o actualizar)
  saveProducto(): void {
    if (this.myForm.invalid) {
      return;
    }

    const producto = this.myForm.value;
    this.loading = true;

    if (this.editing && this.editingId) {
      // Actualizar producto existente
      this.productosService.putData(this.editingId, producto).subscribe({
        next: () => {
          this.cargarProductos();
          this.resetForm();
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Error al actualizar producto';
          this.loading = false;
        }
      });
    } else {
      // Crear nuevo producto
      this.productosService.postData(producto).subscribe({
        next: () => {
          this.cargarProductos();
          this.resetForm();
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Error al crear producto';
          this.loading = false;
        }
      });
    }
  }

  // Método para editar producto
  editar(id: number): void {
    this.editing = true;
    this.editingId = id;
    
    this.productosService.getDataById(id).subscribe({
      next: (producto: any) => {
        this.myForm.patchValue(producto);
      },
      error: (error: any) => {
        this.error = 'Error al cargar producto para editar';
      }
    });
  }

  // Método para borrar producto
  borrar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productosService.deleteData(id).subscribe({
        next: () => {
          this.cargarProductos();
        },
        error: (error: any) => {
          this.error = 'Error al eliminar producto';
        }
      });
    }
  }

  // Método para agregar nuevo producto
  agregar(): void {
    this.resetForm();
  }

  // Resetear formulario
  resetForm(): void {
    this.myForm.reset({
      id: '',
      nombre: '',
      precio: '',
      categoria: '',
      descripcion: ''
    });
    this.editing = false;
    this.editingId = undefined;
  }
}