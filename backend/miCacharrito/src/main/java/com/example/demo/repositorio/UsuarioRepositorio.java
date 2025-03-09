package com.example.demo.repositorio;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modelo.Usuario;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long>{
	
	public List <Usuario> findByPassword(String password);
	
	


}
