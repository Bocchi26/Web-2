package com.example.demo.modelo;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class usuario {
	
	@Id
	@Column(name="identificacion", unique=true)
	private long identificacion;
	
	@Column(name="nombre_completo")
	private String nombre_completo;
	
	@Column(name="fecha_expedicion_licencia")
	private Date fecha_expedicion_licencia;
	
	@Column(name="categoría")
	private String categoría;
	
	@Column(name="vigencia")
	private int vigencia;
	
	@Column(name="correo_electronico", unique=true)
	private String correo_electronico;
	
	@Column(name="telefono")
	private int telefono;
	
	@Column(name="password")
	private String password;

	public usuario() {
		super();
		// TODO Auto-generated constructor stub
	}

	public usuario(long identificacion, String nombre_completo, Date fecha_expedicion_licencia, String categoría,
			int vigencia, String correo_electronico, int telefono, String password) {
		super();
		this.identificacion = identificacion;
		this.nombre_completo = nombre_completo;
		this.fecha_expedicion_licencia = fecha_expedicion_licencia;
		this.categoría = categoría;
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

	public String getCategoría() {
		return categoría;
	}

	public void setCategoría(String categoría) {
		this.categoría = categoría;
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

	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	
	
	
	

	
	

}
