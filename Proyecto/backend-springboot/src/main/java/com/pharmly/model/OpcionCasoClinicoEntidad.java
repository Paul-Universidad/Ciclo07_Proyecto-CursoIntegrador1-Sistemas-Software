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

/** Opción de un caso clínico; tipo DIAGNOSTICO o JUSTIFICACION. */
@Entity
@Table(name = "opcion_caso_clinico")
public class OpcionCasoClinicoEntidad {

    public static final String TIPO_DIAGNOSTICO = "DIAGNOSTICO";
    public static final String TIPO_JUSTIFICACION = "JUSTIFICACION";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "caso_id", nullable = false)
    private CasoClinicoEntidad caso;

    @Column(name = "tipo", nullable = false, length = 20)
    private String type;

    @Column(name = "texto", nullable = false, length = 2000)
    private String text;

    @Column(name = "correcta", nullable = false)
    private boolean correct;

    public Long getId() {
        return id;
    }

    public CasoClinicoEntidad getCaso() {
        return caso;
    }

    public String getType() {
        return type;
    }

    public String getText() {
        return text;
    }

    public boolean isCorrect() {
        return correct;
    }
}
