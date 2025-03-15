package com.example.demo.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.modelo.Vehiculo;

public interface VehiculoRepositorio extends JpaRepository<Vehiculo, String> {
	@Query("SELECT v FROM Vehiculo v " +
		       "LEFT JOIN SolicitudAlquiler sa ON v.placa = sa.id_placa.placa " +
		       "WHERE v.tipo = :tipo " +
		       "AND (sa IS NULL OR sa.estado_alquiler = 'disponible') " +
		       "ORDER BY v.tipo")
		List<Vehiculo> TipoDisponible(String tipo);
}
