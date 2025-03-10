package com.example.demo.modelo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {
	
	@Id
	@Column(name="identificacion", unique=true)
	private long identificacion;
	
	@Column(name="nombre_completo")
	private String nombre_completo;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name="fecha_expedicion_licencia")
	private Date fecha_expedicion_licencia;
	
	@Column(name="categoria")
	private String categoria;
	
	@Column(name="vigencia")
	private int vigencia;
	
	@Column(name="correo_electronico", unique=true)
	private String correo_electronico;
	
	@Column(name="telefono")
	private long telefono;
	
	@Column(name="password")
	private String password;

	public Usuario() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Usuario(long identificacion, String nombre_completo, Date fecha_expedicion_licencia, String categoria,
			int vigencia, String correo_electronico, long telefono, String password) {
		super();
		this.identificacion = identificacion;
		this.nombre_completo = nombre_completo;
		this.fecha_expedicion_licencia = fecha_expedicion_licencia;
		this.categoria = categoria;
		this.vigencia = vigencia;
		this.correo_electronico = correo_electronico;
		this.telefono = telefono;
		this.password = password;
	}

	public long getIdentificacion() {
		return identificacion;
	}

	public void setIdentificacion(long identificacion) {
		this.identificacion = identificacion;
	}

	public String getNombre_completo() {
		return nombre_completo;
	}

	public void setNombre_completo(String nombre_completo) {
		this.nombre_completo = nombre_completo;
	}

	public Date getFecha_expedicion_licencia() {
		return fecha_expedicion_licencia;
	}

	public void setFecha_expedicion_licencia(Date fecha_expedicion_licencia) {
		this.fecha_expedicion_licencia = fecha_expedicion_licencia;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoría(String categoria) {
		this.categoria = categoria;
	}

	public int getVigencia() {
		return vigencia;
	}

	public void setVigencia(int vigencia) {
		this.vigencia = vigencia;
	}

	public String getCorreo_electronico() {
		return correo_electronico;
	}

	public void setCorreo_electronico(String correo_electronico) {
		this.correo_electronico = correo_electronico;
	}

	public long getTelefono() {
		return telefono;
	}

	public void setTelefono(long	 telefono) {
		this.telefono = telefono;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}