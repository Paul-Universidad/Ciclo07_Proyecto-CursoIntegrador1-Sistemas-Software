package com.pharmly.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pharmly.model.PreguntaAprendizajeEntidad;

public interface PreguntasAprendizajeJpaRepositorio extends JpaRepository<PreguntaAprendizajeEntidad, Long> {

    @Query("SELECT DISTINCT q FROM PreguntaAprendizajeEntidad q LEFT JOIN FETCH q.opciones ORDER BY q.id ASC")
    List<PreguntaAprendizajeEntidad> findAllWithOptions();
}
