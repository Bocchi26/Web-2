package com.example.demo.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="administrador")
public class Administrador {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name="id_administrador", unique=true, nullable=false)
	private long id_administrador;
	
	@Column(name="usuario", nullable=false)
	private String usuario;
	
	@Column(name="password_administrador", nullable=false)
	private String password_administrador;

	public Administrador() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Administrador(String usuario, String password_administrador) {
		super();
		this.usuario = usuario;
		this.password_administrador = password_administrador;
	}

	public long getId_administrador() {
		return id_administrador;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getPassword_administrador() {
		return password_administrador;
	}

	public void setPassword_administrador(String password_administrador) {
		this.password_administrador = password_administrador;
	}

	
	
}