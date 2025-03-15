import { SolicitudAlquilerService } from './../../../servicios/solicitud-alquiler.service';
import { Component} from '@angular/core';
import { Vehiculo } from '../../../entidades/vehiculo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehiculoService } from '../../../servicios/vehiculo.service';
import { AuthService } from '../../../servicios/rol/auth.service';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './alquiler.component.html',
  styleUrl: './alquiler.component.css'
})
export class AlquilerComponent {
  tipoSeleccionado: string = '';
  tiposVehiculos: string[] = ['Motocicleta', 'Automóvil', 'Camioneta', 'Campero', 'Microbús'];
  vehiculos: Vehiculo[] = [];
  vehiculoSeleccionado: Vehiculo | null = null;

  // Paginación
  paginaActual: number = 1;
  itemsPorPagina: number = 10;
  vehiculosPaginados: Vehiculo[] = [];
  totalPaginas: number[] = [];

  // Modal y datos de alquiler
  mostrarModal: boolean = false;
  fechaInicio: string = '';
  fechaFin: string = '';
  identificacionUsuario: string | null = '';

  constructor(
    private vehiculoService: VehiculoService,
    private alquilerService: SolicitudAlquilerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.filtrarVehiculos();
    this.identificacionUsuario = this.authService.obtenerIdentificacion();
  }

  filtrarVehiculos() {
    this.vehiculoService.obtenerVehiculosDisponibles(this.tipoSeleccionado).subscribe((data: Vehiculo[]) => {
      this.vehiculos = data;
      this.paginaActual = 1;
      this.actualizarPaginacion();
    });
  }

  seleccionarVehiculo(vehiculo: Vehiculo) {
    this.vehiculoSeleccionado = vehiculo;
    console.log('Vehículo seleccionado:', vehiculo);
  }

  confirmarSeleccion() {
    if (!this.vehiculoSeleccionado) {
      alert('Por favor seleccione un vehículo.');
      return;
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.fechaInicio = '';
    this.fechaFin = '';
  }

  confirmarAlquiler() {
    try {
      if (!this.fechaInicio || !this.fechaFin) throw new Error('Por favor ingrese las fechas de inicio y fin.');
      if (!this.vehiculoSeleccionado) throw new Error('Por favor seleccione un vehículo antes de confirmar.');
      if (!this.identificacionUsuario) throw new Error('Error: No se pudo obtener la identificación del usuario.');
  
      const hoy = new Date();
      const fechaInicioDate = new Date(this.fechaInicio);
      const fechaFinDate = new Date(this.fechaFin);
  
      if (fechaInicioDate < hoy) throw new Error('La fecha de inicio no puede ser anterior a la fecha actual.');
      if (fechaFinDate <= fechaInicioDate) throw new Error('La fecha de fin debe ser posterior a la fecha de inicio.');
  
      const solicitud = {
        id_usuario: { identificacion: this.identificacionUsuario },
        id_placa: { placa: this.vehiculoSeleccionado.placa },
        fecha_inicio: this.fechaInicio,
        fecha_fin: this.fechaFin
      };
  
      console.log('📌 Enviando solicitud de alquiler:', solicitud);

      this.fechaInicio = '';
      this.fechaFin = '';
      this.alquilerService.guardarSolicitud(solicitud).subscribe({
        next: (solicitudGuardada) => {
          console.log('✅ Solicitud registrada:', solicitudGuardada);
          this.mostrarModal = false;
          this.generarPDF(solicitudGuardada);
        },
        error: (error) => {
          console.error('❌ Error al registrar la solicitud:', error);
          alert('Hubo un problema al registrar la solicitud. Inténtelo de nuevo.');
        }
      });
  
    } catch (error: any) {
      console.warn('⚠️ Advertencia:', error.message);
      alert(error.message);
    }
  }
  

  generarPDF(solicitud: any) {
    if (!solicitud || !solicitud.numero_alquiler) {
      alert('Error: No se puede generar el PDF. Datos incompletos.');
      return;
    }

    const doc = new jsPDF();

    doc.text('Detalles de la Solicitud de Alquiler', 10, 10);
    doc.text(`Número: ${solicitud.numero_alquiler}`, 10, 20);
    doc.text(`Usuario: ${solicitud.id_usuario.identificacion}`, 10, 30);
    doc.text(`Vehículo: ${solicitud.id_placa.placa}`, 10, 40);
    doc.text(`Fecha Inicio: ${solicitud.fecha_inicio}`, 10, 50);
    doc.text(`Fecha Fin: ${solicitud.fecha_fin}`, 10, 60);
    doc.text(`Estado: ${solicitud.estado_alquiler || 'Desconocido'}`, 10, 70);
    doc.text(`Valor: ${solicitud.valor || 'No especificado'}`, 10, 80);

    doc.save(`Solicitud_Alquiler_${solicitud.numero_alquiler}.pdf`);
  }

  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.vehiculosPaginados = this.vehiculos.slice(inicio, fin);
    this.totalPaginas = Array(Math.ceil(this.vehiculos.length / this.itemsPorPagina)).fill(0).map((_, i) => i + 1);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina < 1 || nuevaPagina > this.totalPaginas.length) return;
    this.paginaActual = nuevaPagina;
    this.actualizarPaginacion();
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + hoy.getDate()).slice(-2);
    return `${año}-${mes}-${dia}`;
  }
  
}
