import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../entidades/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
    private URL = "http://localhost:8080/ver/vehiculo/disponibles";
  constructor(
    private httpclient : HttpClient)
     { }

  obtenerVehiculosDisponibles(tipo : string): Observable<Vehiculo[]> {
    return this.httpclient.post<Vehiculo[]>(`${this.URL}?tipo=${tipo}`, {});	
  }


  private apiUrl = 'http://localhost:8080/ver/vehiculo/pendientes';
 obtenerVehiculosPendientes(): Observable<any[]> {
  return this.httpclient.get<any[]>(`${this.apiUrl}`);
}

}
