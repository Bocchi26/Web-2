import { AdministradorService } from './../../servicios/administrador.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginadministrador',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [AdministradorService],
  templateUrl: './loginadministrador.component.html',
  styleUrl: './loginadministrador.component.css'
})
export class LoginadministradorComponent implements OnInit {


@Output() loginExitosoAdmin = new EventEmitter<void>();
IniciodeSesionAdminForm: FormGroup<any>;
constructor(private fb: FormBuilder, private administradorService: AdministradorService ) { }


ngOnInit(): void {
    this.IniciodeSesionAdminForm = this.fb.group({ 
      usuario: ['', Validators.required],  //Esto es basicamente para lo que se vaya a ingresar no esé vacío
      password_administrador: ['', [Validators.required, Validators.minLength(6)]] //  Coincide con el backend
    });
}


onSubmit() {
  if(this.IniciodeSesionAdminForm.valid){
    
    const usuario = this.IniciodeSesionAdminForm.value.usuario; // Convertir a String
    const password_administrador = this.IniciodeSesionAdminForm.value.password_administrador;

    console.log('📌 Intentando iniciar sesión con:', this.IniciodeSesionAdminForm.value);

    this.administradorService.loginAdministrador(usuario, password_administrador).subscribe({

      next: (response) => {
        console.log('✅ Inicio de sesión exitoso:', response);
        alert('Inicio de sesión exitoso');
        this.loginExitosoAdmin.emit();

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
