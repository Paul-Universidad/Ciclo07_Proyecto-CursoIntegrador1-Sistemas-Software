package com.pharmly.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class UsuarioEntidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_usuario", nullable = false, unique = true, length = 80)
    private String username;

    @Column(name = "contrasenia", nullable = false)
    private String password;

    /** USUARIO_GENERAL | ESTUDIANTE | ADMIN */
    @Column(name = "tipo", nullable = false, length = 30)
    private String type;

    @Column(name = "nombre", nullable = false)
    private String fullName;

    @Column(name = "correo")
    private String email;

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getType() {
        return type;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }
}
