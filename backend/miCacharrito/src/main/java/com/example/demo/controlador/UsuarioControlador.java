package com.example.demo.controlador;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.modelo.Usuario;
import com.example.demo.repositorio.UsuarioRepositorio;


@RestController
@RequestMapping("/ver/usuario")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioControlador {
	
	@Autowired
	private UsuarioRepositorio repositorioU;
	
	
	 @PostMapping("/registroUsuario")
	    public List<Usuario> registroDelUsuario(@RequestBody Usuario usuario) {
	        this.repositorioU.save(usuario); // Guardar el usuario en la BD
	        return this.repositorioU.findAll(); // Devolver todos los usuarios
	    }
	
	
}
