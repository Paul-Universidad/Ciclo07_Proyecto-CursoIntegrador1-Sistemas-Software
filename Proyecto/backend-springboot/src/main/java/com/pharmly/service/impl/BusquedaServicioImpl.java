package com.pharmly.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.DolenciasDao;
import com.pharmly.dto.response.DolenciaRespuesta;
import com.pharmly.dto.response.MedicamentoRespuesta;
import com.pharmly.dto.response.ResultadoBusquedaRespuesta;
import com.pharmly.model.DolenciaEntidad;
import com.pharmly.service.interfaces.BusquedaServicio;
import com.pharmly.service.interfaces.MedicamentosServicio;

@Service
public class BusquedaServicioImpl implements BusquedaServicio {

    private final MedicamentosServicio medicamentosServicio;
    private final DolenciasDao dolenciasDao;

    public BusquedaServicioImpl(MedicamentosServicio medicamentosServicio, DolenciasDao dolenciasDao) {
        this.medicamentosServicio = medicamentosServicio;
        this.dolenciasDao = dolenciasDao;
    }

    @Override
    @Transactional(readOnly = true)
    public ResultadoBusquedaRespuesta search(String query) {
        if (query == null || query.isBlank()) {
            return new ResultadoBusquedaRespuesta("", List.of(), List.of());
        }
        String q = query.trim();
        List<MedicamentoRespuesta> medicamentos = medicamentosServicio.search(q);
        List<DolenciaRespuesta> dolencias = dolenciasDao.search(q).stream()
                .map(BusquedaServicioImpl::toResponse)
                .toList();
        return new ResultadoBusquedaRespuesta(q, medicamentos, dolencias);
    }

    private static DolenciaRespuesta toResponse(DolenciaEntidad d) {
        return new DolenciaRespuesta(
                d.getId(),
                d.getName(),
                d.getCategoria() != null ? d.getCategoria().getName() : null,
                d.getDescription(),
                d.getSymptoms(),
                d.getAdvice());
    }
}
