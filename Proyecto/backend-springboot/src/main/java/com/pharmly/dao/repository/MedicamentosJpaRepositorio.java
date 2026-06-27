package com.pharmly.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pharmly.model.MedicamentoEntidad;

public interface MedicamentosJpaRepositorio extends JpaRepository<MedicamentoEntidad, Long> {

    List<MedicamentoEntidad> findAllByOrderByNameAsc();

    List<MedicamentoEntidad> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(
            String namePart, String genericPart);
}
