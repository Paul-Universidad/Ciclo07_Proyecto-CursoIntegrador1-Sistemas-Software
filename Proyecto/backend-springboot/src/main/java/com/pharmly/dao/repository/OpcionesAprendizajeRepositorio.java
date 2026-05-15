package com.pharmly.dao.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.OpcionesAprendizajeDao;
import com.pharmly.model.OpcionAprendizajeEntidad;

@Repository
public class OpcionesAprendizajeRepositorio implements OpcionesAprendizajeDao {

    private final OpcionesAprendizajeJpaRepositorio opcionesAprendizajeJpaRepositorio;

    public OpcionesAprendizajeRepositorio(OpcionesAprendizajeJpaRepositorio opcionesAprendizajeJpaRepositorio) {
        this.opcionesAprendizajeJpaRepositorio = opcionesAprendizajeJpaRepositorio;
    }

    @Override
    public Optional<OpcionAprendizajeEntidad> findById(Long id) {
        return opcionesAprendizajeJpaRepositorio.findById(id);
    }
}
