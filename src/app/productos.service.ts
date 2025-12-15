import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl = 'http://localhost:3000/api/productos';  // URL base de la API

  constructor(private http: HttpClient) { }

  // ==========================
  //   GET - Obtener lista
  // ==========================
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  // Compatibilidad con componentes que llaman a `getData()`
  getData(): Observable<Producto[]> {
    return this.getProductos();
  }

  // ==========================
  //   GET BY ID
  // ==========================
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Compatibilidad: algunos componentes llaman a getDataById
  getDataById(id: number): Observable<any> {
    return this.getById(id);
  }

  // ==========================
  //   POST - Nuevo cliente
  // ==========================
  postData(cliente: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, cliente);
  }

  // ==========================
  //   PUT - Editar cliente
  // ==========================
  putData(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, cliente);
  }

  // ==========================
  //   DELETE - Borrar cliente
  // ==========================
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

}