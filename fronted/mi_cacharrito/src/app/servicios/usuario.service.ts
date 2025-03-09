import { Usuario } from './../entidades/usuario';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL ="http://localhost:4200/ver/usuario";

  constructor(
    private httpclient: HttpClient
  ) { }

  registrarUsuario(usuario : Usuario): Observable<Usuario[]> {
    return this.httpclient.post<Usuario[]> (`${this.URL}/RegistroUsuario`, usuario);
  }
}
