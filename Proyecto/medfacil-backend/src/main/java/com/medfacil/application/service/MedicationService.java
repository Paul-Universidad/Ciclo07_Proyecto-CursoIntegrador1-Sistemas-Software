package com.medfacil.application.service;

import java.util.List;

import com.medfacil.api.dto.MedicationResponse;
import com.medfacil.application.dto.MedicationForm;

public interface MedicationService {

    List<MedicationResponse> listAll();

    List<MedicationResponse> search(String query);

    MedicationResponse getById(Long id);

    MedicationResponse create(MedicationForm form);

    MedicationResponse update(Long id, MedicationForm form);

    void deleteById(Long id);
}
