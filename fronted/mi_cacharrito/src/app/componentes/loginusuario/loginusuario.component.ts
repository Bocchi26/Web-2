import { LoginusuarioService } from './../../servicios/loginusuario.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/rol/auth.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-loginusuario',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [LoginusuarioService],
  templateUrl: './loginusuario.component.html',
  styleUrl: './loginusuario.component.css'
})

export class LoginusuarioComponent implements OnInit {
@Output() loginExitoso = new EventEmitter<void>();
IniciodeSesionForm: FormGroup<any>;
constructor(private fb: FormBuilder, private loginusuarioService: LoginusuarioService, private router: Router, private authService: AuthService ) { }


ngOnInit(): void {
    this.IniciodeSesionForm = this.fb.group({ 
      identificacion: ['', Validators.required],  //Esto es basicamente para lo que se vaya a ingresar no esé vacío
      password: ['', [Validators.required, Validators.minLength(6)]] //  Coincide con el backend
    });
}


onSubmit() {
  if (this.IniciodeSesionForm.valid) {
    const identificacion = Number(this.IniciodeSesionForm.value.identificacion); // Convertir a número
    const password = this.IniciodeSesionForm.value.password;

    console.log('📌 Intentando iniciar sesión con:', { identificacion, password });

    this.loginusuarioService.loginUsuario(identificacion, password).subscribe({
      next: (response) => {
        console.log('🔍 Respuesta del servidor:', response);

        if (response === true) {  // ✅ Verificar si la respuesta es `true`
          console.log('✅ Inicio de sesión exitoso');
          alert('Inicio de sesión exitoso');
          this.authService.actualizarRol('usuario-logueado');
          this.authService.guardarUsuario(identificacion.toString());
          this.router.navigate(['/alquiler']);
        } else {
          console.warn('⚠️ Credenciales incorrectas');
          alert('Credenciales incorrectas o usuario no registrado');
        }
      },
      error: (error) => {
        console.error('❌ Error en el inicio de sesión:', error);
        alert('Ocurrió un error en el servidor. Inténtalo de nuevo.');
      }
    });
  } else {
    alert('Por favor, ingresa tus credenciales correctamente.');
  }
}




}
