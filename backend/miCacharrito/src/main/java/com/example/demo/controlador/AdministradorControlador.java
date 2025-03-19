
package com.example.demo.controlador;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Administrador;
import com.example.demo.modelo.SolicitudAlquiler;
import com.example.demo.repositorio.AdministradorRepositorio;
import com.example.demo.repositorio.SolicitudAlquilerRepositorio;

@RestController
@RequestMapping("/ver/Administrador/")
@CrossOrigin(origins = "http://localhost:4200")
public class AdministradorControlador {
	
	@Autowired
	public AdministradorRepositorio repositorioA;
	
	@Autowired
	public SolicitudAlquilerRepositorio repositorioS;
	
	

	
	 @PostMapping("loginAdministrador")
	 public boolean Login(@RequestBody Map<String, String> objecttype) {
		 
		 String usuario = objecttype.get("usuario");
		 String password_administrador = objecttype.get("password_administrador");
		 
		 
		 Administrador admin = repositorioA.findByUsuario(usuario);
		 
		 
		 if(admin != null && password_administrador.equals(admin.getPassword_administrador())) {
			 return true;
		 }
		 return false;
	 } 
	 
	 
	 @GetMapping("/verificarPendiente/{placa}")
	 public ResponseEntity<Boolean> verificarPendiente(@PathVariable String placa) {
	     long cantidad = repositorioS.contarAlquileresPendientes(placa);
	     boolean existePendiente = cantidad > 0;
	     return ResponseEntity.ok(existePendiente);
	 }
	 
	 @PutMapping("/actualizarEstado/{placa}")
	 public ResponseEntity<Map<String, String>> actualizarEstado(@PathVariable String placa) {
	     int filasActualizadas = repositorioS.actualizarEstadoAEntregado(placa);

	     Map<String, String> response = new HashMap<>();
	     
	     if (filasActualizadas > 0) {
	         response.put("mensaje", "Estado actualizado correctamente para la placa: " + placa);
	         return ResponseEntity.ok(response);
	     } else {
	         response.put("mensaje", "No se pudo actualizar el estado. Puede que la placa no exista o no esté en estado 'pendiente'.");
	         return ResponseEntity.badRequest().body(response);
	     }
	 }
	 
	 
	 
	 @GetMapping("/verificarDevolucion/{numeroAlquiler}")
	 public ResponseEntity<?> verificarDevolucion(@PathVariable long numeroAlquiler, @RequestParam("fechaDevolucion") String fechaDevolucion) {
	     // Busca el alquiler por número
	     Optional<SolicitudAlquiler> alquilerOptional = repositorioS.encontrarAlquilerPorNumero(numeroAlquiler);

	     if (!alquilerOptional.isPresent()) {
	         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Alquiler no encontrado");
	     }

	     SolicitudAlquiler alquiler = alquilerOptional.get();

	     // Convertir fechaDevolucion a tipo Date
	     Date fechaDev = parseFechaDevolucion(fechaDevolucion);

	     // Comparar las fechas
	     if (fechaDev.after(alquiler.getFecha_fin())) {
	         // Si la fecha de devolución es posterior a la fecha de fin, calcular el valor extra
	         long diasDeRetraso = calcularDiasDeRetraso(alquiler.getFecha_fin(), fechaDev);
	         double valorExtra = calcularValorExtra(diasDeRetraso, alquiler.getValor());

	         // Crear respuesta con los datos y el valor extra
	         Map<String, Object> response = new HashMap<>();
	         response.put("numero_alquiler", alquiler.getNumero_alquiler());
	         response.put("id_usuario", alquiler.getId_usuario());
	         response.put("id_placa", alquiler.getId_placa());
	         response.put("id_administrador", alquiler.getId_administrador());
	         response.put("fecha_inicio", alquiler.getFecha_inicio());
	         response.put("fecha_fin", alquiler.getFecha_fin());
	         response.put("valor", alquiler.getValor());
	         response.put("estado_alquiler", alquiler.getEstado_alquiler());
	         response.put("valor_extra", valorExtra);
	         response.put("dias_retraso", diasDeRetraso);

	         return ResponseEntity.ok(response);
	     } else {
	         // Si la fecha de devolución es igual o menor a la fecha de fin, no aplicar el valor extra
	         Map<String, Object> response = new HashMap<>();
	         response.put("numero_alquiler", alquiler.getNumero_alquiler());
	         response.put("id_usuario", alquiler.getId_usuario());
	         response.put("id_placa", alquiler.getId_placa());
	         response.put("id_administrador", alquiler.getId_administrador());
	         response.put("fecha_inicio", alquiler.getFecha_inicio());
	         response.put("fecha_fin", alquiler.getFecha_fin());
	         response.put("valor", alquiler.getValor());
	         response.put("estado_alquiler", alquiler.getEstado_alquiler());

	         return ResponseEntity.ok(response);
	     }
	 }


	 
	 
	 private Date parseFechaDevolucion(String fechaDevolucion) {
		    try {
		        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		        return sdf.parse(fechaDevolucion);
		    } catch (ParseException e) {
		        throw new RuntimeException("Fecha de devolución no válida", e);
		    }
		}
	 
	 
	 private long calcularDiasDeRetraso(Date fechaFin, Date fechaDevolucion) {
		    long diferenciaMillis = fechaDevolucion.getTime() - fechaFin.getTime();
		    return TimeUnit.DAYS.convert(diferenciaMillis, TimeUnit.MILLISECONDS);
		}
	 
	 
	 
	 private double calcularValorExtra(long diasDeRetraso, int valorAlquiler) {
		    double porcentajeRetraso = 0.05; // 5% diario
		    return diasDeRetraso * valorAlquiler * porcentajeRetraso;
		}


	 

	   
}
