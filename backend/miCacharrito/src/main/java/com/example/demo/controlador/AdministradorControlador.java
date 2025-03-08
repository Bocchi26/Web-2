
package com.example.demo.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repositorio.AdministradorRepositorio;

@RestController
@RequestMapping("/ver/Administrador/")
public class AdministradorControlador {
	
	@Autowired
	public AdministradorRepositorio repositorioA;

}
