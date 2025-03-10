import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../servicios/usuario.service';
import {  HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [UsuarioService], 
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  registroForm: FormGroup; 
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({ 
      identificacion: ['', Validators.required],
      nombre_completo: ['', Validators.required],  //  Coincide con el backend
      fecha_expedicion_licencia: ['', Validators.required],  //  Coincide con el backend
      categoria: ['', Validators.required],
      vigencia: ['', [Validators.required, Validators.min(1)]],
      correo_electronico: ['', [Validators.required, Validators.email]],  //  Coincide con el backend
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }
  onSubmit() {
    if (this.registroForm.valid) {
      console.log('📌 Datos enviados:', this.registroForm.value);  // Debug
  
      this.usuarioService.registrarUsuario(this.registroForm.value)
        .subscribe({
          next: (response) => {
            console.log('✅ Usuario registrado:', response);
            alert('Registro exitoso');
            this.registroForm.reset();
          },
          error: (error) => {
            console.error('❌ Error en el registro:', error);
            alert('Hubo un error en el registro');
          }
        });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
  
}
