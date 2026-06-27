package com.pharmly.service.interfaces;

import java.util.List;

import com.pharmly.dto.request.MedicamentoFormulario;
import com.pharmly.dto.response.MedicamentoRespuesta;

public interface MedicamentosServicio {

    List<MedicamentoRespuesta> listAll();

    List<MedicamentoRespuesta> search(String query);

    MedicamentoRespuesta getById(Long id);

    MedicamentoRespuesta create(MedicamentoFormulario form);

    MedicamentoRespuesta update(Long id, MedicamentoFormulario form);

    void deleteById(Long id);
}
