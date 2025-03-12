import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from "./componentes/usuario/usuario/usuario.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  UsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mi_cacharrito';
}
