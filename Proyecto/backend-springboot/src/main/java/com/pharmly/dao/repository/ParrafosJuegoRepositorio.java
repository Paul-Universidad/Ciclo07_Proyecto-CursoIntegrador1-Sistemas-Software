package com.pharmly.dao.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.ParrafosJuegoDao;
import com.pharmly.model.ParrafoJuegoEntidad;

@Repository
public class ParrafosJuegoRepositorio implements ParrafosJuegoDao {

    private final ParrafosJuegoJpaRepositorio parrafosJuegoJpaRepositorio;

    public ParrafosJuegoRepositorio(ParrafosJuegoJpaRepositorio parrafosJuegoJpaRepositorio) {
        this.parrafosJuegoJpaRepositorio = parrafosJuegoJpaRepositorio;
    }

    @Override
    public List<ParrafoJuegoEntidad> findAll() {
        return parrafosJuegoJpaRepositorio.findAll();
    }
}
