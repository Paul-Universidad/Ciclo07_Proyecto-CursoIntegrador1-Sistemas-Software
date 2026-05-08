package com.medfacil.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medfacil.infrastructure.persistence.entity.MedicationEntity;

public interface MedicationJpaRepository extends JpaRepository<MedicationEntity, Long> {

    List<MedicationEntity> findAllByOrderByNameAsc();

    List<MedicationEntity> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(
            String namePart, String genericPart);
}
