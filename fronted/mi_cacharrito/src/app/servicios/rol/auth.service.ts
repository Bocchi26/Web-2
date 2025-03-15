import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolSubject = new BehaviorSubject<string>(this.obtenerRolGuardado());
  rol$ = this.rolSubject.asObservable();

  constructor() {}

  actualizarRol(rol: string) {
    this.rolSubject.next(rol);
    localStorage.setItem('rolActual', rol); // ✅ Guarda el rol en localStorage
  }

  guardarUsuario(identificacion: string) {
    localStorage.setItem('identificacion', identificacion); // ✅ Guarda la identificación del usuario
  }

  obtenerIdentificacion(): string | null {
    return localStorage.getItem('identificacion'); // ✅ Recupera la identificación
  }

  cerrarSesion() {
    localStorage.removeItem('rolActual'); // ✅ Borra el rol al cerrar sesión
    localStorage.removeItem('identificacion'); // ✅ Borra la identificación al cerrar sesión
    this.rolSubject.next('inicio'); // ✅ Reinicia el estado del rol
  }

  private obtenerRolGuardado(): string {
    return localStorage.getItem('rolActual') || 'inicio'; // ✅ Recupera el rol guardado o "inicio"
  }
}
