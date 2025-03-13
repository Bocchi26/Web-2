import { LoginusuarioService } from './../../servicios/loginusuario.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
constructor(private fb: FormBuilder, private loginusuarioService: LoginusuarioService ) { }


ngOnInit(): void {
    this.IniciodeSesionForm = this.fb.group({ 
      identificacion: ['', Validators.required],  //Esto es basicamente para lo que se vaya a ingresar no esé vacío
      password: ['', [Validators.required, Validators.minLength(6)]] //  Coincide con el backend
    });
}


onSubmit() {
  if(this.IniciodeSesionForm.valid){
    
    const identificacion = this.IniciodeSesionForm.value.identificacion.toString(); // Convertir a String
    const password = this.IniciodeSesionForm.value.password;

    console.log('📌 Intentando iniciar sesión con:', this.IniciodeSesionForm.value);

    this.loginusuarioService.loginUsuario(identificacion, password).subscribe({

      next: (response) => {
        console.log('✅ Inicio de sesión exitoso:', response);
        alert('Inicio de sesión exitoso');
        this.loginExitoso.emit();

      },
      error: (error) => {
        console.error('❌ Error en el inicio de sesión:', error);
        alert('Credenciales incorrectas o usuario no registrado');
      }
    });  
  } else {
    alert('Por favor, ingresa tus credenciales correctamente.');
  }

}




}
