package com.pharmly.dao.interfaces;

import java.util.List;
import java.util.Optional;

import com.pharmly.model.CasoClinicoEntidad;

public interface CasosClinicosDao {

    List<CasoClinicoEntidad> findAllWithOptions();

    Optional<CasoClinicoEntidad> findByIdWithOptions(Long id);

    long count();
}
