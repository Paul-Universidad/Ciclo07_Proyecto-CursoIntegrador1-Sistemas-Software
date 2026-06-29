package com.pharmly.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

/** Caso clínico del minijuego "Tutorial para ser médico". */
@Entity
@Table(name = "caso_clinico")
public class CasoClinicoEntidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo", nullable = false)
    private String title;

    /** Datos del paciente: edad, sexo, tipo de sangre, síntomas... */
    @Column(name = "perfil", nullable = false, length = 4000)
    private String profile;

    @Column(name = "explicacion", length = 4000)
    private String explanation;

    @OneToMany(mappedBy = "caso", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<OpcionCasoClinicoEntidad> opciones = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getProfile() {
        return profile;
    }

    public String getExplanation() {
        return explanation;
    }

    public List<OpcionCasoClinicoEntidad> getOpciones() {
        return opciones;
    }
}
