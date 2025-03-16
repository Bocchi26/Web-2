import { Usuario } from './../entidades/usuario';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL ="http://localhost:8080/ver/usuario";

  constructor(
    private httpclient: HttpClient
  ) { }

  registrarUsuario(identificacion: number,
    nombre_completo: string,
    fecha_expedicion_licencia: string,
    categoria: string,
    vigencia: number,
    correo_electronico: string,
    telefono: number,
    password: string
  ): Observable<Usuario> { // Devuelve lista de usuarios después del registro
  
    const usuario = {
      identificacion,
      nombre_completo,
      fecha_expedicion_licencia,
      categoria,
      vigencia,
      correo_electronico,
      telefono};
      
      console.log(usuario);

      //se configura el parametro
      const params = new HttpParams().set('password', password);

      return this.httpclient.post<Usuario>(`${this.URL}/registroUsuario`, usuario, {params});
  }
}
