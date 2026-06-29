package com.pharmly.dao.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.DolenciasDao;
import com.pharmly.model.DolenciaEntidad;

@Repository
public class DolenciasRepositorio implements DolenciasDao {

    private final DolenciasJpaRepositorio dolenciasJpaRepositorio;

    public DolenciasRepositorio(DolenciasJpaRepositorio dolenciasJpaRepositorio) {
        this.dolenciasJpaRepositorio = dolenciasJpaRepositorio;
    }

    @Override
    public List<DolenciaEntidad> search(String texto) {
        return dolenciasJpaRepositorio.buscar(texto);
    }

    @Override
    public long count() {
        return dolenciasJpaRepositorio.count();
    }
}
