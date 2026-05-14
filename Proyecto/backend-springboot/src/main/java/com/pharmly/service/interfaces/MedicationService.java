package com.pharmly.service.interfaces;

import java.util.List;

import com.pharmly.dto.request.MedicationForm;
import com.pharmly.dto.response.MedicationResponse;

public interface MedicationService {

    List<MedicationResponse> listAll();

    List<MedicationResponse> search(String query);

    MedicationResponse getById(Long id);

    MedicationResponse create(MedicationForm form);

    MedicationResponse update(Long id, MedicationForm form);

    void deleteById(Long id);
}
