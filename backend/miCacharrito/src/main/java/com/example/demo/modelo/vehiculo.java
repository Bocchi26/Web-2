package com.example.demo.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="vehiculo")
public class vehiculo {
	
	@Id
	@Column(name="placa", unique=true, nullable=false, length=6)
	private String placa;
	
	@Column(name="tipo")
	private String tipo;
	
	@Column(name="color")
	private String color;
	

	public vehiculo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public vehiculo(String placa, String tipo, String color, String estado) {
		super();
		this.placa = placa;
		this.tipo = tipo;
		this.color = color;
		
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	
	
	
	

}
