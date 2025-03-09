import { Usuario } from './../../../../entidades/usuario';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../servicios/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.registroForm = this.fb.group({
      identificacion: ['', Validators.required],
      nombre_c: ['', Validators.required],
      fecha_expedicion_l: ['', Validators.required],
      categoria: ['', Validators.required],
      vigencia: ['', Validators.required],
      correo_e: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const nuevoUsuario: Usuario = this.registroForm.value;
      this.usuarioService.registrarUsuario(nuevoUsuario).subscribe(response => {
        console.log('Usuario registrado:', response);
      });
    }
  }

}
