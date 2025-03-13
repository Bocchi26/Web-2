package com.example.demo.repositorio;



import org.springframework.data.jpa.repository.JpaRepository;


import com.example.demo.modelo.Login;

public interface LoginRepositorio extends JpaRepository<Login, Long> {


}
