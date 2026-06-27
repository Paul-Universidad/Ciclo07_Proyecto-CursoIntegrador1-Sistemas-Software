package com.pharmly.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.MedicamentosDao;
import com.pharmly.dto.request.MedicamentoFormulario;
import com.pharmly.dto.response.MedicamentoRespuesta;
import com.pharmly.exception.ExcepcionRecursoNoEncontrado;
import com.pharmly.model.MedicamentoEntidad;
import com.pharmly.service.interfaces.MedicamentosServicio;

@Service
public class MedicamentosServicioImpl implements MedicamentosServicio {

    private final MedicamentosDao medicamentosDao;

    public MedicamentosServicioImpl(MedicamentosDao medicamentosDao) {
        this.medicamentosDao = medicamentosDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicamentoRespuesta> listAll() {
        return medicamentosDao.findAllByOrderByNameAsc().stream()
                .map(MedicamentosServicioImpl::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicamentoRespuesta> search(String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }
        String q = query.trim();
        return medicamentosDao
                .findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCaseOrderByNameAsc(q, q)
                .stream()
                .map(MedicamentosServicioImpl::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MedicamentoRespuesta getById(Long id) {
        return medicamentosDao.findById(id)
                .map(MedicamentosServicioImpl::toResponse)
                .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Medicamento no encontrado: " + id));
    }

    @Override
    @Transactional
    public MedicamentoRespuesta create(MedicamentoFormulario form) {
        MedicamentoEntidad e = new MedicamentoEntidad();
        applyForm(e, form);
        return toResponse(medicamentosDao.save(e));
    }

    @Override
    @Transactional
    public MedicamentoRespuesta update(Long id, MedicamentoFormulario form) {
        MedicamentoEntidad e = medicamentosDao.findById(id)
                .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Medicamento no encontrado: " + id));
        applyForm(e, form);
        return toResponse(medicamentosDao.save(e));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!medicamentosDao.existsById(id)) {
            throw new ExcepcionRecursoNoEncontrado("Medicamento no encontrado: " + id);
        }
        medicamentosDao.deleteById(id);
    }

    private static void applyForm(MedicamentoEntidad e, MedicamentoFormulario f) {
        e.setName(trimToNull(f.getName()));
        e.setGenericName(trimToNull(f.getGenericName()));
        e.setDescription(trimToNull(f.getDescription()));
        e.setCommonUsage(trimToNull(f.getCommonUsage()));
        e.setPrecautions(trimToNull(f.getPrecautions()));
        e.setDoseGuidance(trimToNull(f.getDoseGuidance()));
        e.setSideEffects(trimToNull(f.getSideEffects()));
        e.setContraindications(trimToNull(f.getContraindications()));
        e.setInteractions(trimToNull(f.getInteractions()));
        e.setAdministrationRoute(trimToNull(f.getAdministrationRoute()));
        e.setRequiresPrescription(f.getRequiresPrescription() != null && f.getRequiresPrescription());
        e.setCategory(trimToNull(f.getCategory()));
        e.setPresentation(trimToNull(f.getPresentation()));
        e.setPrice(parsePrice(f.getPrice()));
    }

    private static String trimToNull(String s) {
        if (s == null) {
            return null;
        }
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }

    private static BigDecimal parsePrice(String raw) {
        if (raw == null) {
            return null;
        }
        String t = raw.trim();
        if (t.isEmpty()) {
            return null;
        }
        try {
            return new BigDecimal(t.replace(',', '.'));
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException("Precio inválido: use un número decimal, por ejemplo 12.50");
        }
    }

    private static MedicamentoRespuesta toResponse(MedicamentoEntidad e) {
        return new MedicamentoRespuesta(
                e.getId(),
                e.getName(),
                e.getGenericName(),
                e.getDescription(),
                e.getCommonUsage(),
                e.getPrecautions(),
                e.getDoseGuidance(),
                e.getSideEffects(),
                e.getContraindications(),
                e.getInteractions(),
                e.getAdministrationRoute(),
                e.getRequiresPrescription(),
                e.getCategory(),
                e.getPresentation(),
                e.getPrice()
        );
    }
}
