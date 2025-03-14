import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolSubject = new BehaviorSubject<string>(this.obtenerRolInicial());
  rol$ = this.rolSubject.asObservable();

  constructor() {}

  private obtenerRolInicial(): string {
    const rolGuardado = localStorage.getItem('rol');
    return rolGuardado === 'usuario-logueado' || rolGuardado === 'admin-logueado' ? 'inicio' : rolGuardado || 'inicio';
  }

  actualizarRol(nuevoRol: string) {
    localStorage.setItem('rol', nuevoRol);
    this.rolSubject.next(nuevoRol);
  }

  cerrarSesion() {
    localStorage.removeItem('rol'); // Eliminar el rol al cerrar sesión
    this.rolSubject.next('inicio');
  }
}
