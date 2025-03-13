import { Component } from '@angular/core';
import { RegistroComponent } from "../registro/registro/registro.component";
import { CommonModule } from '@angular/common';
import { LoginusuarioComponent } from "../../loginusuario/loginusuario.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RegistroComponent, CommonModule, LoginusuarioComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  mostrarRegistrof = false;
  mostrarLoginf = false;
 
  mostrarRegistro() {
    this.mostrarRegistrof = true;
    this.mostrarLoginf = false;
  }

  mostrarLogin() {
    this.mostrarLoginf = true;
    this.mostrarRegistrof = false;
  }

  onRegistroCompletado() {
    this.mostrarLogin();
  }
}
