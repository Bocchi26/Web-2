import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

    private URL = "http://localhost:8080/ver/Administrador";
  
    constructor(private httpclient: HttpClient
    ) { }
  
    loginAdministrador(usuario: string, password_administrador: string): Observable<boolean> {
      const body = { usuario, password_administrador }; // 
      return this.httpclient.post<boolean>(`${this.URL}/loginAdministrador`, body);
    }

}
