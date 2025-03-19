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


    
    // Verificar si un vehículo está pendiente
  verificarPendiente(placa: string): Observable<boolean> {
    return this.httpclient.get<boolean>(`${this.URL}/verificarPendiente/${placa}`);
  }

  actualizarEstado(placa: string): Observable<{ mensaje: string }> {
    return this.httpclient.put<{ mensaje: string }>(`${this.URL}/actualizarEstado/${placa}`, {});
  }


  private URL_CANCELAR = "http://localhost:8080/ver/solicitudAlquiler/cancelarAlquiler";
   // Cancelar un alquiler por ID
   cancelarAlquiler(id: number): Observable<string> {
    return this.httpclient.delete<string>(`${this.URL_CANCELAR}?id=${id}`, { responseType: 'text' as 'json' });
  }


  private URL_VERIFICAR_DEVOLUCION = "http://localhost:8080/ver/Administrador/verificarDevolucion"; // Ajusta la URL según tu API

  // Verificar la devolución de un alquiler
  verificarDevolucion(numeroAlquiler: number, fechaDevolucion: string): Observable<any> {
    const url = `${this.URL_VERIFICAR_DEVOLUCION}/${numeroAlquiler}?fechaDevolucion=${fechaDevolucion}`;
    return this.httpclient.get<any>(url);  // Se espera una respuesta del tipo 'any'
  }

}
