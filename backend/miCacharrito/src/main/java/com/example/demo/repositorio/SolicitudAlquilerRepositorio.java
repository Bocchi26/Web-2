package com.example.demo.repositorio;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.modelo.SolicitudAlquiler;


public interface SolicitudAlquilerRepositorio extends JpaRepository<SolicitudAlquiler, Long> {
	@Query("SELECT s FROM SolicitudAlquiler s WHERE s.id_usuario.identificacion = :identificacion")
	List<SolicitudAlquiler> alquileresDeUsuario(@Param("identificacion") String identificacion);
}
