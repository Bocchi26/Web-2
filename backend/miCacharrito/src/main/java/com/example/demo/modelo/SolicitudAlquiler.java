package com.example.demo.modelo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="alquiler")
public class SolicitudAlquiler {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name="numero_alquiler")
	private long numero_alquiler;
	
	@ManyToOne()
	@JoinColumn(name= "identificacion", referencedColumnName="identificacion", nullable=false)
	private Usuario id_usuario;
	
	@ManyToOne()
	@JoinColumn(name="placa", referencedColumnName="placa", nullable=false)
	private Vehiculo id_placa;
	
	@ManyToOne()
	@JoinColumn(name="id_administrador", referencedColumnName="id_administrador", nullable=false)
	private Administrador id_administrador;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name="fecha_inicio", nullable=false)
	private Date fecha_inicio;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name="fecha_fin", nullable=false)
	private Date fecha_fin;
	
	@Column(name="valor")
	private int valor;
	
	@Column(name="estado_alquiler")
	private String estado_alquiler;

	public SolicitudAlquiler() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SolicitudAlquiler(Usuario id_usuario, Vehiculo id_placa, Administrador id_administrador, Date fecha_inicio,
			Date fecha_fin, int valor, String estado_alquiler) {
		super();
		this.id_usuario = id_usuario;
		this.id_placa = id_placa;
		this.id_administrador = id_administrador;
		this.fecha_inicio = fecha_inicio;
		this.fecha_fin = fecha_fin;
		this.valor = valor;
		this.estado_alquiler = estado_alquiler;
	}

	public long getNumero_alquiler() {
		return numero_alquiler;
	}

	public Usuario getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(Usuario id_usuario) {
		this.id_usuario = id_usuario;
	}

	public Vehiculo getId_placa() {
		return id_placa;
	}

	public void setId_placa(Vehiculo id_placa) {
		this.id_placa = id_placa;
	}

	public Administrador getId_administrador() {
		return id_administrador;
	}

	public void setId_administrador(Administrador id_administrador) {
		this.id_administrador = id_administrador;
	}

	public Date getFecha_inicio() {
		return fecha_inicio;
	}

	public void setFecha_inicio(Date fecha_inicio) {
		this.fecha_inicio = fecha_inicio;
	}

	public Date getFecha_fin() {
		return fecha_fin;
	}

	public void setFecha_fin(Date fecha_fin) {
		this.fecha_fin = fecha_fin;
	}

	public int getValor() {
		return valor;
	}

	public void setValor(int valor) {
		this.valor = valor;
	}


	public String getEstado_alquiler() {
		return estado_alquiler;
	}

	public void setEstado_alquiler(String estado_alquiler) {
		this.estado_alquiler = estado_alquiler;
	}
	
	
	
}