package com.example.demo.controlador;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repositorio.AdministradorRepositorio;
import com.example.demo.repositorio.SolicitudAlquilerRepositorio;
import com.example.demo.repositorio.UsuarioRepositorio;
import com.example.demo.repositorio.VehiculoRepositorio;
import com.example.demo.modelo.Administrador;
import com.example.demo.modelo.SolicitudAlquiler;
import com.example.demo.modelo.Usuario;
import com.example.demo.modelo.Vehiculo;

@RestController
@RequestMapping("ver/solicitudAlquiler")
@CrossOrigin(origins = "http://localhost:4200")
public class SolicitudAlquilerControlador {
	@Autowired
	public SolicitudAlquilerRepositorio repositorioS;

	@Autowired
	private UsuarioRepositorio repositorioU;
	
	@Autowired
	public VehiculoRepositorio repositorioV;

	@Autowired
	public AdministradorRepositorio repositorioA;
	
	@PostMapping("/guardar")
	public ResponseEntity<?> guardarSolicitud(@RequestBody SolicitudAlquiler solicitud) {
	    // Buscar el usuario en la base de datos
	    Usuario usuario = repositorioU.findById(solicitud.getId_usuario().getIdentificacion()).orElse(null);
	    if (usuario == null) {
	        return ResponseEntity.badRequest().body("El usuario no existe");
	    }

	    // Buscar el vehículo en la base de datos
	    Vehiculo vehiculo = repositorioV.findById(solicitud.getId_placa().getPlaca()).orElse(null);
	    if (vehiculo == null) {
	        return ResponseEntity.badRequest().body("El vehículo no existe");
	    }

	    // Buscar al administrador
	    Administrador admin = repositorioA.findById(1L).orElse(null);
	    if (admin == null) {
	        return ResponseEntity.badRequest().body("Administrador no encontrado");
	    }

	    // Validar fechas
	    if (solicitud.getFecha_inicio() == null || solicitud.getFecha_fin() == null) {
	        return ResponseEntity.badRequest().body("Las fechas de inicio y fin son obligatorias");
	    }
	    if (solicitud.getFecha_inicio().after(solicitud.getFecha_fin())) {
	        return ResponseEntity.badRequest().body("La fecha de inicio no puede ser posterior a la fecha de fin");
	    }

	    // Calcular el valor del alquiler
	    int valorBase = 50000;  // Valor estándar de alquiler
	    int valorExtra = 0;  // Por si hay recargos

	    // Crear la solicitud de alquiler
	    SolicitudAlquiler nuevaSolicitud = new SolicitudAlquiler(
	        usuario,
	        vehiculo,
	        admin,
	        solicitud.getFecha_inicio(),
	        solicitud.getFecha_fin(),
	        null, // La fecha de devolución será null hasta que se entregue el vehículo
	        valorBase,
	        valorExtra,
	        "pendiente"
	    );

	    // Guardar en la base de datos
	    SolicitudAlquiler solicitudGuardada = repositorioS.save(nuevaSolicitud);

	    // Retornar la solicitud guardada en formato JSON
	    return ResponseEntity.ok(solicitudGuardada);
	}

	
	


}
