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

    constructor(private router: Router,  private authService: AuthService) {}
    ngOnInit() {
      this.authService.rol$.subscribe(rol => {
        this.rolActual = rol;
      });
    }
    seleccionarUsuario() {
      this.rolActual = 'usuario-no-logueado'; // Cambia al estado de usuario no logueado
    }

    seleccionarAdministrador() {
      this.rolActual = 'admin-no-logueado';
      this.mostrarLoginAdministrador(); // Cambia al estado de administrador no logueado
    }

    mostrarRegistro() {
      this.router.navigate(['/registro']); // Redirige al componente de registro
    }

    mostrarLoginUsuario() {
      this.router.navigate(['/login-usuario']); // Redirige al componente de login de usuario
    }

    mostrarLoginAdministrador() {
      this.router.navigate(['/login-administrador']); // Redirige al componente de login de administrador
    }

    iniciarSesionComoUsuario() {
      this.rolActual = 'usuario-logueado'; // Cambia al estado de usuario logueado
      this.router.navigate(['/usuario']); // Redirige al área de usuario
    }

    iniciarSesionComoAdmin() {
      this.rolActual = 'admin-logueado'; // Cambia al estado de administrador logueado
      this.router.navigate(['/admin']); // Redirige al área de administrador
    }

    cerrarSesion() {
       
      this.authService.cerrarSesion(); // Cambia el estado al inicial
  console.log('Redirigiendo a la raíz...');
  this.router.navigate(['/']).then(() => {
    console.log('Redirección completada.');
  }).catch((error) => {
    console.error('Error en la redirección:', error);
  }); // Ahora usa el método centralizado// Redirige a la página de inicio
    }

    irAlquiler() {
      this.router.navigate(['/alquiler']); // Redirige al componente de alquiler
    }

    irCancelarAlquiler() {
      this.router.navigate(['/cancelar-alquiler']); // Redirige al componente de cancelar alquiler
    }

    verListados() {
      this.router.navigate(['/listados']); // Redirige al componente de listados
    }

    cambiarEstado() {
      this.router.navigate(['/cambiar-estado']); // Redirige al componente de cambiar estado
    }
}
