package com.example.demo.repositorio;



import org.springframework.data.jpa.repository.JpaRepository;


import com.example.demo.modelo.Login;
import com.example.demo.modelo.Usuario;

public interface LoginRepositorio extends JpaRepository<Login, Long> {
	
	public Login findByIdUsuario(Usuario idUsuario);


}
