package com.pharmly.dao.interfaces;

import java.util.List;
import java.util.Optional;

import com.pharmly.model.PreguntaAprendizajeEntidad;

public interface PreguntasAprendizajeDao {

    List<PreguntaAprendizajeEntidad> findAllWithOptions();

    Optional<PreguntaAprendizajeEntidad> findById(Long id);

    long count();
}
