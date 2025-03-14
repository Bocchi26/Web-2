
import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/usuario/registro/registro/registro.component';
import { LoginusuarioComponent } from './componentes/loginusuario/loginusuario.component';
import { LoginadministradorComponent } from './componentes/loginadministrador/loginadministrador.component';
import { AlquilerComponent } from './componentes/usuario/alquiler/alquiler.component';
import { CancelaralquilerComponent } from './componentes/usuario/cancelaralquiler/cancelaralquiler.component';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { NavPrincipalComponent } from './navegadores/nav-principal/nav-principal.component';

export const routes: Routes = [
  {
    path: '',
    component: NavPrincipalComponent, // Componente principal
    children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioComponent },
        { path: 'registro', component: RegistroComponent },
        { path: 'login-usuario', component: LoginusuarioComponent },
        { path: 'login-administrador', component: LoginadministradorComponent },
        { path: 'alquiler', component: AlquilerComponent },
        { path: 'cancelar-alquiler', component: CancelaralquilerComponent }
    ]
}
];


