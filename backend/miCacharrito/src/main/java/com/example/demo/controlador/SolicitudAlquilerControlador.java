package com.example.demo.controlador;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("/guardarS")
	public String guardarsolicitud() {
		Usuario usuario = repositorioU.findById((long) 76567898).orElse(null);
		Vehiculo vehiculo = repositorioV.findById((String) "ABD123").orElse(null);
		Administrador admin = repositorioA.findById((long) 1).orElse(null);
		
		if(usuario == null && vehiculo == null && admin == null) {
			return "No se encontró";
		} try {
            // Definir fechas quemadas
            SimpleDateFormat formato = new SimpleDateFormat("MM/dd/yyyy");
            Date fecha_inicio = formato.parse("03/15/2025");
            Date fecha_fin = formato.parse("03/20/2025");
            Date fecha_devolucion = formato.parse("03/21/2025");

            // Crear la solicitud
            SolicitudAlquiler soli = new SolicitudAlquiler(
                usuario, vehiculo, admin, 
                fecha_inicio, fecha_fin, fecha_devolucion, 
                50000, 10000, "disponible"
            );

            // Guardar en la base de datos
            repositorioS.save(soli);

            return "Solicitud de alquiler guardada con éxito";

        } catch (ParseException e) {
            return "Error al convertir las fechas";
        }
    }
	
	


}
