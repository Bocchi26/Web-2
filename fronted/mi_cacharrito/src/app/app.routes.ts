
import { provideRouter, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/usuario/registro/registro/registro.component';
import { LoginusuarioComponent } from './componentes/loginusuario/loginusuario.component';
import { LoginadministradorComponent } from './componentes/loginadministrador/loginadministrador.component';
import { AlquilerComponent } from './componentes/usuario/alquiler/alquiler.component';
import { CancelaralquilerComponent } from './componentes/usuario/cancelaralquiler/cancelaralquiler.component';
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';

export const routes: Routes = [
    { path: 'registro', component: RegistroComponent },
    { path: 'login-usuario', component: LoginusuarioComponent },
    { path: 'login-administrador', component: LoginadministradorComponent },
    { path: 'alquiler', component: AlquilerComponent },
    { path: 'cancelar-alquiler', component: CancelaralquilerComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' } // Ruta por defecto
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));


