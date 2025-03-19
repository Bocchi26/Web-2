package com.example.demo.repositorio;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.modelo.SolicitudAlquiler;
import com.example.demo.modelo.Vehiculo;

import jakarta.transaction.Transactional;


public interface SolicitudAlquilerRepositorio extends JpaRepository<SolicitudAlquiler, Long> {
	@Query("SELECT s FROM SolicitudAlquiler s WHERE s.id_usuario.identificacion = :identificacion")
	List<SolicitudAlquiler> alquileresDeUsuario(@Param("identificacion") String identificacion);
	
	
	@Query("SELECT COUNT(s) FROM SolicitudAlquiler s WHERE s.id_placa.placa = :placa AND LOWER(TRIM(s.estado_alquiler)) = LOWER(TRIM('pendiente'))")
	long contarAlquileresPendientes(@Param("placa") String placa);
	
    // Actualizar el estado de "pendiente" a "entregado" para una placa específica
	@Modifying
	@Transactional
	@Query("UPDATE SolicitudAlquiler s SET s.estado_alquiler = 'entregado' WHERE s.id_placa.placa = :placa AND LOWER(TRIM(s.estado_alquiler)) = 'pendiente'")
	int actualizarEstadoAEntregado(@Param("placa") String placa);

	@Query("SELECT s FROM SolicitudAlquiler s WHERE s.numero_alquiler = :numeroAlquiler")
    Optional<SolicitudAlquiler> encontrarAlquilerPorNumero(@Param("numeroAlquiler") long numeroAlquiler);
	
	
}
