import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router ,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-principal',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './nav-principal.component.html',
  styleUrl: './nav-principal.component.css'
})
export class NavPrincipalComponent {
  mostrarNav = true; // Se muestra por defecto

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Ocultar el nav si está en /usuario o /administrador
      this.mostrarNav = !['/usuario', '/administrador'].includes(this.router.url);
    });
  }
}
