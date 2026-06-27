package com.pharmly.dao.interfaces;

import java.util.List;
import java.util.Optional;

import com.pharmly.model.MedicamentoEntidad;

public interface MedicamentosDao {

    List<MedicamentoEntidad> findAllByOrderByNameAsc();

    List<MedicamentoEntidad> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(
            String namePart, String genericPart);

    Optional<MedicamentoEntidad> findById(Long id);

    MedicamentoEntidad save(MedicamentoEntidad entity);

    boolean existsById(Long id);

    void deleteById(Long id);

    long count();
}
