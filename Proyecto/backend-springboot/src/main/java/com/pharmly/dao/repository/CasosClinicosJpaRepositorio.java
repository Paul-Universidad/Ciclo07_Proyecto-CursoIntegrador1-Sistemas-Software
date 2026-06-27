package com.pharmly.dao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pharmly.model.CasoClinicoEntidad;

public interface CasosClinicosJpaRepositorio extends JpaRepository<CasoClinicoEntidad, Long> {

    @Query("SELECT DISTINCT c FROM CasoClinicoEntidad c LEFT JOIN FETCH c.opciones")
    List<CasoClinicoEntidad> findAllWithOptions();

    @Query("SELECT c FROM CasoClinicoEntidad c LEFT JOIN FETCH c.opciones WHERE c.id = :id")
    Optional<CasoClinicoEntidad> findByIdWithOptions(@Param("id") Long id);
}
