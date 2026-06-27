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

/** Dolencia o malestar consultable desde el módulo de búsqueda. */
@Entity
@Table(name = "dolencia")
public class DolenciaEntidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private CategoriaDolenciaEntidad categoria;

    @Column(name = "descripcion", length = 4000)
    private String description;

    @Column(name = "sintomas", length = 4000)
    private String symptoms;

    @Column(name = "consejos", length = 4000)
    private String advice;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public CategoriaDolenciaEntidad getCategoria() {
        return categoria;
    }

    public String getDescription() {
        return description;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public String getAdvice() {
        return advice;
    }
}
