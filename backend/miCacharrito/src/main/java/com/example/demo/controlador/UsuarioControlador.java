package com.example.demo.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repositorio.UsuarioRepositorio;

@RestController
@RequestMapping("/ver/usuario")
@CrossOrigin(origins = "http://localhost:4200/")
public class UsuarioControlador {
	
	@Autowired
	public UsuarioRepositorio repositorioU;
	
	

}
