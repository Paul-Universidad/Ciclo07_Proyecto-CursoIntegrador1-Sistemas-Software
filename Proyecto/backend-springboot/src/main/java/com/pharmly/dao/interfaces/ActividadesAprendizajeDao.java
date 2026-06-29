package com.pharmly.dao.interfaces;

import java.util.List;

import com.pharmly.model.ActividadAprendizajeEntidad;

public interface ActividadesAprendizajeDao {

    ActividadAprendizajeEntidad save(ActividadAprendizajeEntidad actividad);

    List<ActividadAprendizajeEntidad> findByUserIdOrderByDateDesc(Long userId);
}
