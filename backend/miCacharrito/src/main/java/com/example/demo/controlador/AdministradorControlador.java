
package com.example.demo.controlador;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Administrador;
import com.example.demo.repositorio.AdministradorRepositorio;

@RestController
@RequestMapping("/ver/Administrador/")
@CrossOrigin(origins = "http://localhost:4200")
public class AdministradorControlador {
	
	@Autowired
	public AdministradorRepositorio repositorioA;
	
	//*@GetMapping("/guardarE")
	//public Empleado GuardarEmpleado(){
		//Empleado empleado = new Empleado (10203040,"Eduardo", "ledesme", "ledesmatonte@gmail.com");
		//return this.repositorioE.save(empleado);
	//}
	
	@GetMapping("guardarA")
	public Administrador guardarAdmin() {
		Administrador admin = new Administrador("Diego","Diegod123");
		return this.repositorioA.save(admin);
	}
	
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

}
