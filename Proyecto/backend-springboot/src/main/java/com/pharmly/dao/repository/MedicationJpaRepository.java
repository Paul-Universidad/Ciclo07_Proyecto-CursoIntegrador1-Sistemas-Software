package com.pharmly.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pharmly.model.MedicationEntity;

public interface MedicationJpaRepository extends JpaRepository<MedicationEntity, Long> {

    List<MedicationEntity> findAllByOrderByNameAsc();

    List<MedicationEntity> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(
            String namePart, String genericPart);
}
