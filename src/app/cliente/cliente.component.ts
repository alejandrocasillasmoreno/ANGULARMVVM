import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  title = 'angularmvvm';


  clientes: any[] = [];
  error: string | null = null;
  data: any;  // Variable para almacenar los datos
  loading: boolean = true;  // Indicador de carga
  myForm: FormGroup;
  editing: boolean = false;
  editingId: number | null = null;

  constructor(private clientesService:ClientesService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: [null],
      nombre: [''],
      email: [''],
      telefono: ['']
    });
  }


  ngOnInit() {
    
      this.getClientes(); // Cargar los datos cuando el componente se inicializa
    }
  
  
  
  getClientes(): void {
      this.clientesService.getData('clientes').subscribe({
        next: (data: any) => {
          this.clientes = data;  
          this.loading = false;   // Detener el indicador de carga
        },
        error: (err: any) => {
          this.error = 'Error al cargar clientes';  // Manejar errores
          console.error(err);
        }
      });
  }
    borrar(valor: number): void {
      console.log('El valor es: ', valor);
  
      this.clientesService.BorrarDatos(valor).subscribe({
        next: (data: any[]) => {
          this.clientes = data;
          this.loading = false;
          },
        error: (err: any) => {
          this.error = 'Error al borrar el cliente '; // Manejar errores
          console.error(err);
  
        }
      });
    }
    editar(clienteId: number): void {
      const cliente = this.clientes.find(c => c.id === clienteId);
      if (!cliente) {
        this.error = 'Cliente no encontrado';
        return;
      }
      this.myForm.patchValue({
        id: cliente.id,
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono
      });
      this.editing = true;
      this.editingId = clienteId;
    }

    agregar() {
      this.myForm.reset({ id: null, nombre: '', email: '', telefono: '' });
      this.editing = false;
      this.editingId = null;
    }

    saveCliente() {
      const payload = this.myForm.value;
      if (this.myForm.invalid) {
        return;
      }

      if (this.editing && this.editingId) {
        // Actualizar cliente usando método REST explícito
        this.clientesService.updateCliente(this.editingId, payload).subscribe({
          next: () => {
            this.getClientes();
            this.myForm.reset({ id: null, nombre: '', email: '', telefono: '' });
            this.editing = false;
            this.editingId = null;
          },
          error: (err: any) => {
            this.error = 'Error al actualizar cliente';
            console.error(err);
          }
        });
      } else {
        // Crear nuevo cliente usando método REST explícito
        this.clientesService.createCliente(payload).subscribe({
          next: () => {
            this.getClientes();
            this.myForm.reset({ id: null, nombre: '', email: '', telefono: '' });
          },
          error: (err: any) => {
            this.error = 'Error al crear cliente';
            console.error(err);
          }
        });
      }
    }
  }
