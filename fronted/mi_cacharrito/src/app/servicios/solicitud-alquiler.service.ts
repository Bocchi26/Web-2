import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudAlquiler } from '../entidades/solicitud-alquiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAlquilerService {

  private URL_GUARDAR = "http://localhost:8080/ver/solicitudAlquiler/guardar";
  private URL_ALQUILERES = "http://localhost:8080/ver/solicitudAlquiler/alquilaerUsuario";
  private URL_CANCELAR = "http://localhost:8080/ver/solicitudAlquiler/cancelarAlquiler";

  constructor(private httpclient: HttpClient) {}

  // Guardar una solicitud de alquiler
  guardarSolicitud(solicitud: any): Observable<any> {
    return this.httpclient.post<any>(this.URL_GUARDAR, solicitud);
  } 

  // Obtener alquileres por usuario
  obtenerAlquileresPorUsuario(identificacionUsuario: string): Observable<SolicitudAlquiler[]> {
    return this.httpclient.get<SolicitudAlquiler[]>(`${this.URL_ALQUILERES}?identificacion=${identificacionUsuario}`,{});
  } 

  // Cancelar un alquiler por ID
  cancelarAlquiler(id: number): Observable<string> {
    return this.httpclient.delete<string>(`${this.URL_CANCELAR}?id=${id}`, { responseType: 'text' as 'json' });
  }
}
