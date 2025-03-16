package com.example.demo.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "login")
public class Login {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 	@Column(name="id_login")
	    private Long id;

	    @Column(name ="password",nullable = false)
	    private String password;

	    @OneToOne
	    @JoinColumn(name = "identificacion", referencedColumnName = "identificacion", nullable = false)
	    private Usuario idUsuario;
	    
	    

		public Login() {
			super();
			// TODO Auto-generated constructor stub
		}



		public Login(String password, Usuario idUsuario) {
			super();
			this.password = password;
			this.idUsuario = idUsuario;
		}



		public String getPassword() {
			return password;
		}



		public void setPassword(String password) {
			this.password = password;
		}



		public Usuario getIdUsuario() {
			return idUsuario;
		}



		public void setIdUsuario(Usuario idUsuario) {
			this.idUsuario = idUsuario;
		}



		
	    

}


