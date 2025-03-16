import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicios/rol/auth.service';
import { SolicitudAlquilerService } from '../../../servicios/solicitud-alquiler.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancelaralquiler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancelaralquiler.component.html',
  styleUrl: './cancelaralquiler.component.css'
})
export class CancelaralquilerComponent implements OnInit {
  identificacionUsuario: string | null = '';
  alquileres: any[] = [];
  alquilerSeleccionado: any ;

  // Paginación
  paginaActual: number = 1;
  itemsPorPagina: number = 10;
  alquileresPaginados: any[] = [];
  totalPaginas: number[] = [];

  constructor(
    private alquilerService: SolicitudAlquilerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.identificacionUsuario = this.authService.obtenerIdentificacion();
    if (this.identificacionUsuario) {
      this.obtenerAlquileres();
    }
  }

  obtenerAlquileres() {
    this.alquilerService.obtenerAlquileresPorUsuario(this.identificacionUsuario!).subscribe(
      (data) => {
        this.alquileres = data || []; // Asegurar que es un array válido
        this.paginaActual = 1;
        this.actualizarPaginacion();
      },
      (error) => {
        console.error('Error obteniendo alquileres:', error);
      }
    );
  }

  seleccionarAlquiler(alquiler: any) {
    this.alquilerSeleccionado = alquiler;
    console.log("Alquiler seleccionado:", this.alquilerSeleccionado);
  }

  cancelarAlquiler() {
    if (!this.alquilerSeleccionado) {
      alert('Por favor seleccione un alquiler para cancelar.');
      return;
    }

    const confirmacion = confirm('¿Está seguro de cancelar este alquiler?');
    if (!confirmacion) return;

    console.log("Objeto alquiler:", this.alquilerSeleccionado.numero_alquiler);
    this.alquilerService.cancelarAlquiler(this.alquilerSeleccionado.numero_alquiler).subscribe(
      (response: string)=> {
        alert(response);
        this.alquileres = this.alquileres.filter(a => a.id !== this.alquilerSeleccionado?.id);
        this.alquilerSeleccionado = null;
        this.actualizarPaginacion();
        this.obtenerAlquileres();
      },
      (error) => {
        console.error('Error al cancelar alquiler:', error);
        alert('Error al cancelar el alquiler.');
      }
    );
  }

  actualizarPaginacion() {
    const totalPaginas = Math.ceil(this.alquileres.length / this.itemsPorPagina);
    this.totalPaginas = Array(totalPaginas).fill(0).map((_, i) => i + 1);

    if (this.paginaActual > this.totalPaginas.length) {
      this.paginaActual = Math.max(1, this.totalPaginas.length);
    }

    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.alquileresPaginados = this.alquileres.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina < 1 || nuevaPagina > this.totalPaginas.length) return;
    this.paginaActual = nuevaPagina;
    this.actualizarPaginacion();
  }
}

