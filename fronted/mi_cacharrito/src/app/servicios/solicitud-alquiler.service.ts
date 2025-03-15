import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudAlquiler } from '../entidades/solicitud-alquiler';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAlquilerService {

  private URL = "http://localhost:8080/ver/solicitudAlquiler/guardar";

  constructor(private httpclient : HttpClient) { }

  guardarSolicitud(solicitud: any) {
    return this.httpclient.post<any>(this.URL, solicitud);
  } 

}
