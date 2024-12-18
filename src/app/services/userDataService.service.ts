// data-service-usuarios.ts
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { Injectable } from "@angular/core";
import { Usuario, UsuarioUpdate } from "../model/usuario.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataServiceUsuarios { 
  private baseUrl = 'http://localhost:5048/api/Usuario/Usuarios'; 
  private updtUrl = 'http://localhost:5048/api/Usuario'
  private authHeader = 'Basic amFtZXM6amFtZXMxMjM=';
  private registerUrl = 'http://localhost:5048/register';  

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authHeader
      })
    };
  }

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl, this.getHttpOptions());
  }

  cambiarEstadoUsuario(id:number, nuevoEstado: boolean): Observable<void>{
    const url = `http://localhost:5048/api/Usuario/cambiarEstado/${id}`;
    return this.http.put<void>(url,nuevoEstado,this.getHttpOptions());
  }

  deleteUsuario(id:number):Observable<void>{
    const url = `http://localhost:5048/api/Usuario/${id}`;
    return this.http.delete<void>(url,this.getHttpOptions());
  }

  cambiarContrasena(userData: any):Observable<any> {
    return this.http.post<any>('http://localhost:5048/api/Usuario/cambiarContrasena', userData);
}  

  // Obtener un usuario por ID
  buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`, this.getHttpOptions());
  }

  // Crear un nuevo usuario
  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.registerUrl, usuario, this.getHttpOptions());
  }

  // Actualizar un usuario
  actualizarUsuario(id: number, usuario: UsuarioUpdate): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.updtUrl}/${id}`, usuario, this.getHttpOptions());
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.getHttpOptions());
  }
}
