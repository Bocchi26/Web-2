import { CommonModule } from '@angular/common';
import { AdministradorService } from './../../servicios/administrador.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fechaentrega',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './fechaentrega.component.html',
  styleUrls: ['./fechaentrega.component.css']
})
export class FechaentregaComponent {

  verificarDevolucionForm: FormGroup;
  alquiler: any;  // Contendrá los datos del alquiler verificado
  alquilerSeleccionado: any; // Alquiler seleccionado para eliminar
  fechaDevolucion: string = '';

  constructor(private fb: FormBuilder, private administradorService: AdministradorService) {}

  ngOnInit(): void {
    this.verificarDevolucionForm = this.fb.group({
      numeroAlquiler: ['', Validators.required],
      fechaDevolucion: ['', Validators.required]
    });
  }

  verificarDevolucion(): void {
    const numeroAlquiler = this.verificarDevolucionForm.get('numeroAlquiler')?.value;
    const fechaDevolucion = this.verificarDevolucionForm.get('fechaDevolucion')?.value;

    this.administradorService.verificarDevolucion(numeroAlquiler, fechaDevolucion).subscribe(
      (data) => {
        this.alquiler = data;  // Los datos de la solicitud de alquiler
        console.log('Datos de alquiler:', this.alquiler);
      },
      (error) => {
        alert('Error al verificar la devolución.');
        console.error(error);
      }
    );
  }

  seleccionarAlquiler(alquiler: any) {
    this.alquilerSeleccionado = alquiler;
    console.log("Alquiler seleccionado:", this.alquilerSeleccionado);
  }

  eliminarAlquiler() {
    if (!this.alquilerSeleccionado) {
      alert('Por favor seleccione un alquiler para eliminar.');
      return;
    }

    const confirmacion = confirm('¿Está seguro de eliminar este alquiler?');
    if (!confirmacion) return;

    console.log("Objeto alquiler:", this.alquilerSeleccionado.numero_alquiler);
    this.administradorService.cancelarAlquiler(this.alquilerSeleccionado.numero_alquiler).subscribe(
      (response: string) => {
        alert(response);  // Mensaje de éxito
        this.alquiler = null;  // Limpiar alquiler verificado
        this.alquilerSeleccionado = null;  // Limpiar alquiler seleccionado
      },
      (error) => {
        console.error('Error al eliminar alquiler:', error);
        alert('Error al eliminar el alquiler.');
      }
    );
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + hoy.getDate()).slice(-2);
    return `${año}-${mes}-${dia}`;
  }
}
