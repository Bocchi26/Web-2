package com.example.demo.controlador;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Usuario;
import com.example.demo.modelo.Login;

import com.example.demo.repositorio.LoginRepositorio;
import com.example.demo.repositorio.UsuarioRepositorio;
@RestController
@RequestMapping("/ver/loginusuario")
@CrossOrigin(origins = "http://localhost:4200")

public class LoginUsuarioControlador {
	
	@Autowired
	private UsuarioRepositorio repositorioU;


	@Autowired
	private LoginRepositorio repositorioL;


	 @PostMapping("loginUsuario")
	 public boolean Login(@RequestBody Map<String, String> objecttype) {
		 
		 Long identificacion = Long.parseLong(objecttype.get("identificacion"));
		 String password = objecttype.get("password");
		 
		 
		 Usuario usu = repositorioU.findById(identificacion).orElse(null);
		 Login log = repositorioL.findByIdUsuario(usu);
		 
		 
		 
		 if(usu != null && password.equals(log.getPassword())) {
			 return true;
		 }
		 return false;
	 } 


}
