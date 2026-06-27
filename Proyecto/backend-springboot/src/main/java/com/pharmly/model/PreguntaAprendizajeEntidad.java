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

@Entity
@Table(name = "pregunta_aprendizaje")
public class PreguntaAprendizajeEntidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enunciado", nullable = false, length = 2000)
    private String prompt;

    @Column(name = "explicacion", length = 4000)
    private String explanation;

    @OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL, orphanRemoval = false)
    @OrderBy("id ASC")
    private List<OpcionAprendizajeEntidad> opciones = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getPrompt() {
        return prompt;
    }

    public String getExplanation() {
        return explanation;
    }

    public List<OpcionAprendizajeEntidad> getOpciones() {
        return opciones;
    }
}
