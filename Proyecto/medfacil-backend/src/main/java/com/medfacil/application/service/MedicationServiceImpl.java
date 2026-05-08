package com.medfacil.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medfacil.api.dto.MedicationResponse;
import com.medfacil.application.dao.MedicationDAO;
import com.medfacil.application.dto.MedicationForm;
import com.medfacil.infrastructure.persistence.entity.MedicationEntity;
import com.medfacil.shared.exception.ResourceNotFoundException;

@Service
public class MedicationServiceImpl implements MedicationService {

    private final MedicationDAO medicationDAO;

    public MedicationServiceImpl(MedicationDAO medicationDAO) {
        this.medicationDAO = medicationDAO;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicationResponse> listAll() {
        return medicationDAO.findAllByOrderByNameAsc().stream()
                .map(MedicationServiceImpl::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicationResponse> search(String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }
        String q = query.trim();
        return medicationDAO
                .findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(q, q)
                .stream()
                .map(MedicationServiceImpl::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MedicationResponse getById(Long id) {
        return medicationDAO.findById(id)
                .map(MedicationServiceImpl::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Medicamento no encontrado: " + id));
    }

    @Override
    @Transactional
    public MedicationResponse create(MedicationForm form) {
        MedicationEntity e = new MedicationEntity();
        applyForm(e, form);
        return toResponse(medicationDAO.save(e));
    }

    @Override
    @Transactional
    public MedicationResponse update(Long id, MedicationForm form) {
        MedicationEntity e = medicationDAO.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medicamento no encontrado: " + id));
        applyForm(e, form);
        return toResponse(medicationDAO.save(e));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!medicationDAO.existsById(id)) {
            throw new ResourceNotFoundException("Medicamento no encontrado: " + id);
        }
        medicationDAO.deleteById(id);
    }

    private static void applyForm(MedicationEntity e, MedicationForm f) {
        e.setName(trimToNull(f.getName()));
        e.setGenericName(trimToNull(f.getGenericName()));
        e.setDescription(trimToNull(f.getDescription()));
        e.setCommonUsage(trimToNull(f.getCommonUsage()));
        e.setPrecautions(trimToNull(f.getPrecautions()));
        e.setDoseGuidance(trimToNull(f.getDoseGuidance()));
        e.setSideEffects(trimToNull(f.getSideEffects()));
    }

    private static String trimToNull(String s) {
        if (s == null) {
            return null;
        }
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }

    private static MedicationResponse toResponse(MedicationEntity e) {
        return new MedicationResponse(
                e.getId(),
                e.getName(),
                e.getGenericName(),
                e.getDescription(),
                e.getCommonUsage(),
                e.getPrecautions(),
                e.getDoseGuidance(),
                e.getSideEffects()
        );
    }
}
