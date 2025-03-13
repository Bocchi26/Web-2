import { Routes } from '@angular/router';
import { UsuarioComponent } from './componentes/usuario/usuario/usuario.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { LoginusuarioComponent } from './componentes/loginusuario/loginusuario.component';

export const routes: Routes = [
    {path: 'usuario', component: UsuarioComponent},
    {path: 'administrador', component: AdministradorComponent},
    {path: 'loginusuario', component: LoginusuarioComponent},
]
;
