package com.example.demo.controlador;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.modelo.Usuario;
import com.example.demo.repositorio.UsuarioRepositorio;


@RestController
@RequestMapping("/ver/usuario")
public class UsuarioControlador {
	
	@Autowired
	private UsuarioRepositorio repositorioU;
	
	
	@PostMapping("/registroUsuario")
	public List<Usuario> RegistroDelUsuario(
			@RequestParam long identificacion,
			@RequestParam String nombre_c,
			@RequestParam String fecha_expedicion_l,
			@RequestParam String categoria,
			@RequestParam int vigencia,
			@RequestParam String correo_e,
			@RequestParam int telefono,
			@RequestParam String password
			
			)throws ParseException{
				
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
		
		Date fechau = sdf.parse(fecha_expedicion_l);
		
		Usuario usuario = new Usuario(identificacion, nombre_c, fechau, categoria, vigencia, correo_e, telefono, password);
		
		this.repositorioU.save(usuario);
		return this.repositorioU.findAll();
	}
	
}
