package com.pharmly.dao.interfaces;

import java.util.List;

import com.pharmly.model.DolenciaEntidad;

public interface DolenciasDao {

    List<DolenciaEntidad> search(String texto);

    long count();
}
