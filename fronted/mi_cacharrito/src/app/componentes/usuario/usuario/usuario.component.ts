import { Component } from '@angular/core';
import { RegistroComponent } from "../registro/registro/registro.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RegistroComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

}
