package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modelo.SolicitudAlquiler;

public interface SolicitudAlquilerRepositorio extends JpaRepository<SolicitudAlquiler, Long> {

}
