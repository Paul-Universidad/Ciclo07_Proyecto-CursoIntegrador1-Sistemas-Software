package com.pharmly.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "opcion_aprendizaje")
public class OpcionAprendizajeEntidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregunta_id", nullable = false)
    private PreguntaAprendizajeEntidad pregunta;

    @Column(name = "texto_opcion", nullable = false, length = 1000)
    private String text;

    @Column(name = "correcta", nullable = false)
    private boolean correct;

    public Long getId() {
        return id;
    }

    public PreguntaAprendizajeEntidad getPregunta() {
        return pregunta;
    }

    public String getText() {
        return text;
    }

    public boolean isCorrect() {
        return correct;
    }
}
