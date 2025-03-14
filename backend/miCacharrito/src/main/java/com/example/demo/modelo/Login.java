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
	    private Usuario id_usuario;
	    
	    

		public Login() {
			super();
			// TODO Auto-generated constructor stub
		}



		public Login( String password, Usuario id_usuario) {
			super();
			this.password = password;
			this.id_usuario = id_usuario;
		}



		public Long getId() {
			return id;
		}



		public void setId(Long id) {
			this.id = id;
		}



		public String getPassword() {
			return password;
		}



		public void setPassword(String password) {
			this.password = password;
		}



		public Usuario getId_usuario() {
			return id_usuario;
		}



		public void setId_usuario(Usuario id_usuario) {
			this.id_usuario = id_usuario;
		}
	    
	    

}


