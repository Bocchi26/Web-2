package com.example.demo.controlador;

import java.text.ParseException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	    int valorBase;
	    switch (vehiculo.getTipo()) {
	        case "Motocicleta":
	            valorBase = 30000;
	            break;
	        case "Automóvil":
	            valorBase = 50000;
	            break;
	        case "Camioneta":
	            valorBase = 70000;
	            break;
	        case "Campero":
	            valorBase = 75000;
	            break;
	        case "Microbús":
	            valorBase = 90000;
	            break;
	        default:
	            return ResponseEntity.badRequest().body("Tipo de vehículo no reconocido");
	    }

	    // Calcular la cantidad de días del alquiler
	    int diasAlquiler = (int) ((solicitud.getFecha_fin().getTime() - solicitud.getFecha_inicio().getTime()) / (1000 * 60 * 60 * 24));
	    int valorTotal = valorBase * Math.max(diasAlquiler, 1);

	    // Crear la solicitud de alquiler
	    SolicitudAlquiler nuevaSolicitud = new SolicitudAlquiler(
	        usuario,
	        vehiculo,
	        admin,
	        solicitud.getFecha_inicio(),
	        solicitud.getFecha_fin(),
	        valorBase,
	        "pendiente"
	    );

	    // Guardar en la base de datos
	    SolicitudAlquiler solicitudGuardada = repositorioS.save(nuevaSolicitud);

	 // **FORMATEAR FECHAS**
	    SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyy-MM-dd");
	    String fechaInicioFormateada = formatoFecha.format(solicitudGuardada.getFecha_inicio());
	    String fechaFinFormateada = formatoFecha.format(solicitudGuardada.getFecha_fin());

	    // **RESPUESTA**
	    Map<String, Object> respuesta = new HashMap<>();
	    respuesta.put("numero_alquiler", solicitudGuardada.getNumero_alquiler());
	    respuesta.put("usuario", usuario.getNombre_completo());
	    respuesta.put("vehiculo", Map.of(
	        "placa", vehiculo.getPlaca(),
	        "tipo", vehiculo.getTipo(),
	        "color", vehiculo.getColor()
	    ));
	    respuesta.put("fecha_inicio", fechaInicioFormateada);  // **FECHA FORMATEADA**
	    respuesta.put("fecha_fin", fechaFinFormateada);        // **FECHA FORMATEADA**
	    respuesta.put("estado_alquiler", solicitudGuardada.getEstado_alquiler());
	    respuesta.put("valor", solicitudGuardada.getValor());

	    return ResponseEntity.ok(respuesta);
	}

	 // Obtener alquileres por usuario
    @GetMapping("/alquilaerUsuario")
    public ResponseEntity<List<SolicitudAlquiler>> obtenerAlquileresPorUsuario(@RequestParam String identificacion) {
        List<SolicitudAlquiler> alquileres = repositorioS.alquileresDeUsuario(identificacion);
        return ResponseEntity.ok(alquileres);
    }

    // Cancelar alquiler con RequestParam
    @DeleteMapping("/cancelarAlquiler")
    public ResponseEntity<String> cancelarAlquiler(@RequestParam Long id) {
        if (repositorioS.existsById(id)) {
            repositorioS.deleteById(id);
            return ResponseEntity.ok("Alquiler cancelado exitosamente.");
        } else {
            return ResponseEntity.badRequest().body("El alquiler no existe.");
        }
    }
}
