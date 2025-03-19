import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiarestado',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cambiarestado.component.html',
  styleUrl: './cambiarestado.component.css'
})
export class CambiarestadoComponent implements OnInit {
  
  ngOnInit(): void {
    
    this.cambiarestadoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

  }

  constructor(
    private fb: FormBuilder,
    private administradorService: AdministradorService,
    private router: Router
  ) {}
  
  cambiarestadoForm: FormGroup;
  estadoPendiente: boolean = false;
  placaIngresada: string = '';

  // Función para verificar si la placa está pendiente
  verificarEstado() {
    if (this.cambiarestadoForm.valid) {
      this.placaIngresada = this.cambiarestadoForm.value.placa;
      this.administradorService.verificarPendiente(this.placaIngresada).subscribe({
        next: (existePendiente) => {
          if (existePendiente) {
            this.estadoPendiente = true;
            alert(`✅ La placa ${this.placaIngresada} está en estado PENDIENTE.`);
          } else {
            this.estadoPendiente = false;
            alert(`⚠️ La placa ${this.placaIngresada} no tiene un alquiler pendiente.`);
          }
        },
        error: () => {
          alert('❌ Error al verificar el estado. Intenta de nuevo.');
        }
      });
    } else {
      alert('⚠️ Ingresa una placa válida.');
    }
  }


  cambiarEstado() {
    if (!this.estadoPendiente) {
      alert('⚠️ Primero verifica que la placa esté en estado pendiente.');
      return;
    }
  
    this.administradorService.actualizarEstado(this.placaIngresada).subscribe({
      next: (respuesta) => {  // Ahora 'respuesta' es un objeto con 'mensaje'
        console.log(respuesta.mensaje);  // Accedemos a la propiedad 'mensaje'
        alert(`✅ ${respuesta.mensaje}`);  // Alerta con el mensaje completo
        this.estadoPendiente = false;
        this.cambiarestadoForm.reset();
      },
      error: (err) => {
        console.error(err);  // Mostrar en consola detalles del error
        alert('❌ No se pudo cambiar el estado. Intenta de nuevo.');
      }
    });
  }
  
  


  
}
