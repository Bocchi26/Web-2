import { Component } from '@angular/core';
import { NavPrincipalComponent } from "./navegadores/nav-principal/nav-principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NavPrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mi_cacharrito';
}
