package com.medfacil.application.dao;

import java.util.List;
import java.util.Optional;

import com.medfacil.infrastructure.persistence.entity.MedicationEntity;

public interface MedicationDAO {

    List<MedicationEntity> findAllByOrderByNameAsc();

    List<MedicationEntity> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(
            String namePart, String genericPart);

    Optional<MedicationEntity> findById(Long id);

    MedicationEntity save(MedicationEntity entity);

    boolean existsById(Long id);

    void deleteById(Long id);

    long count();
}
