package com.example.demo.controlador;


import java.text.ParseException;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.modelo.Usuario;
import com.example.demo.modelo.Login;
import com.example.demo.repositorio.LoginRepositorio;
import com.example.demo.repositorio.UsuarioRepositorio;



@RestController
@RequestMapping("/ver/usuario")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioControlador {
	
	@Autowired
	private UsuarioRepositorio repositorioU;
	
	@Autowired
	private LoginRepositorio repositorioL;
	
	
	 @PostMapping("/registroUsuario")
	    public Usuario registroDelUsuario(@RequestParam String password,
	    		@RequestBody Usuario usuario)throws ParseException{
		 
	        repositorioU.save(usuario); // Guardar el usuario en la BD
	         
	        Login log = new Login(password, usuario);
	        repositorioL.save(log);
	        
	        return usuario;

	    }
	 

	 
	 
	
	
}
