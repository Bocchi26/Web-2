import { Component } from '@angular/core';
import { VehiculoService } from '../../servicios/vehiculo.service';
import { CommonModule } from '@angular/common';
import { Vehiculo } from '../../entidades/vehiculo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

  // Vehículos pendientes
  vehiculosPendientes: Vehiculo[] = [];
  vehiculosPendientesPaginados: Vehiculo[] = [];
  paginaPendientes: number = 1;
  totalPaginasPendientes: number = 0;

  // Vehículos filtrados
  tiposVehiculos: string[] = ['Motocicleta', 'Automóvil', 'Camioneta', 'Campero', 'Microbús'];
  vehiculosFiltrados: Vehiculo[] = [];
  vehiculosFiltradosPaginados: Vehiculo[] = [];
  tipoSeleccionado: string = '';
  vehiculoSeleccionado: Vehiculo | null = null;
  paginaFiltrados: number = 1;
  totalPaginasFiltrados: number = 0;

  itemsPorPagina: number = 5;

  constructor(private vehiculoService: VehiculoService) {}

  // OBTENER VEHÍCULOS PENDIENTES
  obtenerVehiculos(): void {
    this.vehiculoService.obtenerVehiculosPendientes().subscribe(
      (data) => {
        this.vehiculosPendientes = data;
        this.paginaPendientes = 1; // Reiniciar paginación
        this.actualizarPaginacionPendientes();
      },
      (error) => console.error('Error al obtener los vehículos pendientes', error)
    );
  }

  // FILTRAR VEHÍCULOS POR TIPO
  filtrarVehiculos(): void {
    this.vehiculoService.obtenerVehiculosDisponibles(this.tipoSeleccionado).subscribe(
      (data) => {
        this.vehiculosFiltrados = data;
        console.log('Vehículos filtrados:', this.vehiculosFiltrados); // VERIFICAR SI LLEGAN DATOS
        this.paginaFiltrados = 1;
        this.actualizarPaginacionFiltrados();
      },
      (error) => console.error('Error al filtrar los vehículos', error)
    );
  }

  // ACTUALIZAR PAGINACIÓN PARA VEHÍCULOS PENDIENTES
  actualizarPaginacionPendientes(): void {
    this.totalPaginasPendientes = Math.ceil(this.vehiculosPendientes.length / this.itemsPorPagina);
    const inicio = (this.paginaPendientes - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.vehiculosPendientesPaginados = this.vehiculosPendientes.slice(inicio, fin);
  }

  cambiarPaginaPendientes(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginasPendientes) {
      this.paginaPendientes = nuevaPagina;
      this.actualizarPaginacionPendientes();
    }
  }

  // ACTUALIZAR PAGINACIÓN PARA VEHÍCULOS FILTRADOS
  actualizarPaginacionFiltrados(): void {
    this.totalPaginasFiltrados = Math.ceil(this.vehiculosFiltrados.length / this.itemsPorPagina);
    const inicio = (this.paginaFiltrados - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.vehiculosFiltradosPaginados = this.vehiculosFiltrados.slice(inicio, fin);
  }

  cambiarPaginaFiltrados(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginasFiltrados) {
      this.paginaFiltrados = nuevaPagina;
      this.actualizarPaginacionFiltrados();
    }
  }
}
