import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginusuarioService {

  private URL = "http://localhost:8080/ver/loginusuario";

  constructor(private httpclient: HttpClient) { }

  loginUsuario(identificacion: number, password: string): Observable<boolean> {
    const body = { identificacion, password }; // 🔍 Asegúrate de que 'identificacion' es un número
    return this.httpclient.post<boolean>(`${this.URL}/loginUsuario`, body);
  }

  
}
