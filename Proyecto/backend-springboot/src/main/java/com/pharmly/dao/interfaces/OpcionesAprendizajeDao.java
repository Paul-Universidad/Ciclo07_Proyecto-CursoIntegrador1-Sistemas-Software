package com.pharmly.dao.interfaces;

import java.util.Optional;

import com.pharmly.model.OpcionAprendizajeEntidad;

public interface OpcionesAprendizajeDao {

    Optional<OpcionAprendizajeEntidad> findById(Long id);
}
