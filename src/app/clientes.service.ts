import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private baseUrl = 'http://localhost:3000/api/clientes';
  // raíz de la API para los endpoints que pasan el path como parámetro
  private apiRoot = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // ==========================
  //   GET - Obtener lista
  // ==========================
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  // Compatibilidad con componentes que llaman a `getData('clientes')`
  getData(path?: string): Observable<any> {
    if (path) {
      return this.http.get<any>(`${this.apiRoot}/${path}`);
    }
    return this.getClientes();
  }

  // ==========================
  //   GET BY ID
  // ==========================
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  // ==========================
  //   POST - Nuevo cliente
  // ==========================
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  // Compatibilidad con componentes que llaman a `postData('crear_cliente', payload)`
  postData(path: string, payload: any): Observable<any> {
    // Compatibilidad con rutas legadas desde la UI
    if (path === 'crear_cliente') {
      // La API REST espera POST /api/clientes
      return this.http.post<any>(`${this.apiRoot}/clientes`, payload);
    }
    return this.http.post<any>(`${this.apiRoot}/${path}`, payload);
  }

  // ==========================
  //   PUT - Editar cliente
  // ==========================
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${id}`, cliente);
  }

  // Compatibilidad con componentes que llaman a `putData('editar_cliente', payload)`
  putData(path: string, payload: any): Observable<any> {
    // Compatibilidad con rutas legadas desde la UI
    if (path === 'editar_cliente') {
      // Se espera que payload incluya `id` — usamos PUT /api/clientes/:id
      const id = payload && payload.id;
      if (id !== undefined && id !== null) {
        return this.http.put<any>(`${this.apiRoot}/clientes/${id}`, payload);
      }
      // Si no hay id, intentamos usar la ruta tal cual
      return this.http.put<any>(`${this.apiRoot}/${path}`, payload);
    }
    return this.http.put<any>(`${this.apiRoot}/${path}`, payload);
  }

  // ==========================
  //   DELETE - Borrar cliente
  // ==========================
  deleteCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Compatibilidad con componentes que llaman a `BorrarDatos(id)`
  BorrarDatos(id: number): Observable<any> {
    return this.deleteCliente(id);
  }
}