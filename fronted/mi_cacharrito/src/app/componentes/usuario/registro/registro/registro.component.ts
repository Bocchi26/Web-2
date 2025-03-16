import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  providers: [UsuarioService], 
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup; 

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({ 
      identificacion: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      fecha_expedicion_licencia: ['', Validators.required],
      categoria: ['', Validators.required],
      vigencia: ['', [Validators.required, Validators.min(1)]],
      correo_electronico: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });  
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const { password, ...usuarioData } = this.registroForm.value;
      console.log('📌 Datos enviados:', usuarioData);  // Debug
  
      this.usuarioService.registrarUsuario(
        usuarioData.identificacion,
        usuarioData.nombre_completo,
        usuarioData.fecha_expedicion_licencia,
        usuarioData.categoria,
        usuarioData.vigencia,
        usuarioData.correo_electronico,
        usuarioData.telefono,
        password
      ).subscribe({
        next: (response) => {
          console.log('✅ Usuario registrado:', response);
          alert('Registro exitoso');
          this.registroForm.reset();
        },
        error: (error) => {
          console.error('❌ Error en el registro:', error);
          alert('Hubo un error en el registro, su email ya está registrado');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}


