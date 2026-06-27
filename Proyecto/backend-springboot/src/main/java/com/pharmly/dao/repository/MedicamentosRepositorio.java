package com.pharmly.dao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.MedicamentosDao;
import com.pharmly.model.MedicamentoEntidad;

@Repository
public class MedicamentosRepositorio implements MedicamentosDao {

    private final MedicamentosJpaRepositorio medicamentosJpaRepositorio;

    public MedicamentosRepositorio(MedicamentosJpaRepositorio medicamentosJpaRepositorio) {
        this.medicamentosJpaRepositorio = medicamentosJpaRepositorio;
    }

    @Override
    public List<MedicamentoEntidad> findAllByOrderByNameAsc() {
        return medicamentosJpaRepositorio.findAllByOrderByNameAsc();
    }

    @Override
    public List<MedicamentoEntidad> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(
            String namePart, String genericPart) {
        return medicamentosJpaRepositorio
                .findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(namePart, genericPart);
    }

    @Override
    public Optional<MedicamentoEntidad> findById(Long id) {
        return medicamentosJpaRepositorio.findById(id);
    }

    @Override
    public MedicamentoEntidad save(MedicamentoEntidad entity) {
        return medicamentosJpaRepositorio.save(entity);
    }

    @Override
    public boolean existsById(Long id) {
        return medicamentosJpaRepositorio.existsById(id);
    }

    @Override
    public void deleteById(Long id) {
        medicamentosJpaRepositorio.deleteById(id);
    }

    @Override
    public long count() {
        return medicamentosJpaRepositorio.count();
    }
}
