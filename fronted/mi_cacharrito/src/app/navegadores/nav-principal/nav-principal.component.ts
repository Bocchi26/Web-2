import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router ,RouterOutlet } from '@angular/router';
import { AuthService } from '../../servicios/rol/auth.service';

@Component({
  selector: 'app-nav-principal',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ],
  templateUrl: './nav-principal.component.html',
  styleUrl: './nav-principal.component.css'
})
export class NavPrincipalComponent implements OnInit {
  rolActual: string = 'inicio'; // Estado inicial

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.rol$.subscribe(rol => {
      this.rolActual = rol;
    });
  }

  seleccionarUsuario() {
    this.authService.actualizarRol('usuario-no-logueado');
  }

  seleccionarAdministrador() {
    this.authService.actualizarRol('admin-no-logueado');
    this.mostrarLoginAdministrador();
  }

  mostrarRegistro() {
    this.router.navigate(['/registro']);
  }

  mostrarLoginUsuario() {
    this.router.navigate(['/login-usuario']);
  }

  mostrarLoginAdministrador() {
    this.router.navigate(['/login-administrador']);
  }

  iniciarSesionComoUsuario() {
    this.authService.actualizarRol('usuario-logueado'); // ✅ Usa AuthService
    this.router.navigate(['/usuario']);
  }

  iniciarSesionComoAdmin() {
    this.authService.actualizarRol('admin-logueado'); // ✅ Usa AuthService
    this.router.navigate(['/admin']);
  }

  cerrarSesion() {
    this.authService.cerrarSesion(); // ✅ Usa AuthService
    this.router.navigate(['/']); // ✅ Redirige a la página de inicio
  }

  irAlquiler() {
    this.router.navigate(['/alquiler']);
  }

  irCancelarAlquiler() {
    this.router.navigate(['/cancelar-alquiler']);
  }

  verListados() {
    this.router.navigate(['/listados']);
  }

  cambiarEstado() {
    this.router.navigate(['/cambiar-estado']);
  }
}
