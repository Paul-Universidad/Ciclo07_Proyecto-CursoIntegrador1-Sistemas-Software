package com.pharmly.dao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.CasosClinicosDao;
import com.pharmly.model.CasoClinicoEntidad;

@Repository
public class CasosClinicosRepositorio implements CasosClinicosDao {

    private final CasosClinicosJpaRepositorio casosClinicosJpaRepositorio;

    public CasosClinicosRepositorio(CasosClinicosJpaRepositorio casosClinicosJpaRepositorio) {
        this.casosClinicosJpaRepositorio = casosClinicosJpaRepositorio;
    }

    @Override
    public List<CasoClinicoEntidad> findAllWithOptions() {
        return casosClinicosJpaRepositorio.findAllWithOptions();
    }

    @Override
    public Optional<CasoClinicoEntidad> findByIdWithOptions(Long id) {
        return casosClinicosJpaRepositorio.findByIdWithOptions(id);
    }

    @Override
    public long count() {
        return casosClinicosJpaRepositorio.count();
    }
}
