package com.pharmly.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pharmly.model.DolenciaEntidad;

public interface DolenciasJpaRepositorio extends JpaRepository<DolenciaEntidad, Long> {

    @Query("""
            SELECT d FROM DolenciaEntidad d LEFT JOIN FETCH d.categoria
            WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :texto, '%'))
               OR LOWER(d.symptoms) LIKE LOWER(CONCAT('%', :texto, '%'))
            ORDER BY d.name ASC
            """)
    List<DolenciaEntidad> buscar(@Param("texto") String texto);
}
