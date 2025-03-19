package com.example.demo.controlador;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Vehiculo;
import com.example.demo.repositorio.VehiculoRepositorio;

@RestController
@RequestMapping("/ver/vehiculo")
@CrossOrigin(origins = "http://localhost:4200")
public class VehiculoControlador {
	
	@Autowired
	public VehiculoRepositorio repositorioV;

	//*@GetMapping("/guardarE")
	//public Empleado GuardarEmpleado(){
		//Empleado empleado = new Empleado (10203040,"Eduardo", "ledesme", "ledesmatonte@gmail.com");
		//return this.repositorioE.save(empleado);
	//}
	
	@GetMapping("/guardarV")
	public Vehiculo guardarvehiculo() {
		Vehiculo vehi = new Vehiculo("ABD123","camioneta","rojo");
		return this.repositorioV.save(vehi);
	}
	
	@PostMapping("/disponibles")
    public List<Vehiculo> obtenerVehiculosDisponibles(@RequestParam String tipo) {
		
        return repositorioV.TipoDisponible(tipo);
    }
	
	@GetMapping("/pendientes")
	public List<Map<String, String>> obtenerVehiculosPendientes() {
	    List<Object[]> resultados = repositorioV.VehiculosPendientes();
	    List<Map<String, String>> vehiculos = new ArrayList<>();

	    for (Object[] obj : resultados) {
	        Map<String, String> vehiculo = new HashMap<>();
	        vehiculo.put("placa", obj[0].toString());
	        vehiculo.put("tipo", obj[1].toString());
	        vehiculo.put("color", obj[2].toString());
	        vehiculos.add(vehiculo);
	    }
	    return vehiculos;
	}
	

}
