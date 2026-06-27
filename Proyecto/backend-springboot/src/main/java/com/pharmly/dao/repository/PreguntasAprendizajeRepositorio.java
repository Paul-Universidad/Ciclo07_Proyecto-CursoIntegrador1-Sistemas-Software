package com.pharmly.dao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.PreguntasAprendizajeDao;
import com.pharmly.model.PreguntaAprendizajeEntidad;

@Repository
public class PreguntasAprendizajeRepositorio implements PreguntasAprendizajeDao {

    private final PreguntasAprendizajeJpaRepositorio preguntasAprendizajeJpaRepositorio;

    public PreguntasAprendizajeRepositorio(PreguntasAprendizajeJpaRepositorio preguntasAprendizajeJpaRepositorio) {
        this.preguntasAprendizajeJpaRepositorio = preguntasAprendizajeJpaRepositorio;
    }

    @Override
    public List<PreguntaAprendizajeEntidad> findAllWithOptions() {
        return preguntasAprendizajeJpaRepositorio.findAllWithOptions();
    }

    @Override
    public Optional<PreguntaAprendizajeEntidad> findById(Long id) {
        return preguntasAprendizajeJpaRepositorio.findById(id);
    }

    @Override
    public long count() {
        return preguntasAprendizajeJpaRepositorio.count();
    }
}
