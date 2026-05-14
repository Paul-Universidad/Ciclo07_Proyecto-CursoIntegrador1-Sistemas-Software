package com.pharmly.dao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.MedicationDAO;
import com.pharmly.model.MedicationEntity;

@Repository
public class MedicationRepository implements MedicationDAO {

    private final MedicationJpaRepository medicationJpaRepository;

    public MedicationRepository(MedicationJpaRepository medicationJpaRepository) {
        this.medicationJpaRepository = medicationJpaRepository;
    }

    @Override
    public List<MedicationEntity> findAllByOrderByNameAsc() {
        return medicationJpaRepository.findAllByOrderByNameAsc();
    }

    @Override
    public List<MedicationEntity> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(
            String namePart, String genericPart) {
        return medicationJpaRepository
                .findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(namePart, genericPart);
    }

    @Override
    public Optional<MedicationEntity> findById(Long id) {
        return medicationJpaRepository.findById(id);
    }

    @Override
    public MedicationEntity save(MedicationEntity entity) {
        return medicationJpaRepository.save(entity);
    }

    @Override
    public boolean existsById(Long id) {
        return medicationJpaRepository.existsById(id);
    }

    @Override
    public void deleteById(Long id) {
        medicationJpaRepository.deleteById(id);
    }

    @Override
    public long count() {
        return medicationJpaRepository.count();
    }
}
