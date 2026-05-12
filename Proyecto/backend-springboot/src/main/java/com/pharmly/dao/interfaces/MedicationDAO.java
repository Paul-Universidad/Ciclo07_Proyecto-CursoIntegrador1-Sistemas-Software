package com.pharmly.dao.interfaces;

import java.util.List;
import java.util.Optional;

import com.pharmly.model.MedicationEntity;

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
