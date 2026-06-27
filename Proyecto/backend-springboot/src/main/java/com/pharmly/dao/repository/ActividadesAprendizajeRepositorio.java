package com.pharmly.dao.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.ActividadesAprendizajeDao;
import com.pharmly.model.ActividadAprendizajeEntidad;

@Repository
public class ActividadesAprendizajeRepositorio implements ActividadesAprendizajeDao {

    private final ActividadesAprendizajeJpaRepositorio actividadesAprendizajeJpaRepositorio;

    public ActividadesAprendizajeRepositorio(
            ActividadesAprendizajeJpaRepositorio actividadesAprendizajeJpaRepositorio) {
        this.actividadesAprendizajeJpaRepositorio = actividadesAprendizajeJpaRepositorio;
    }

    @Override
    public ActividadAprendizajeEntidad save(ActividadAprendizajeEntidad actividad) {
        return actividadesAprendizajeJpaRepositorio.save(actividad);
    }

    @Override
    public List<ActividadAprendizajeEntidad> findByUserIdOrderByDateDesc(Long userId) {
        return actividadesAprendizajeJpaRepositorio.findByUserIdOrderByDateDesc(userId);
    }
}
