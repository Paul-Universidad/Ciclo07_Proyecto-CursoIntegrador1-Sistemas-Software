package com.medfacil.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medfacil.api.dto.MedicationResponse;
import com.medfacil.application.service.MedicationService;

@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    private final MedicationService medicationService;

    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @GetMapping
    public List<MedicationResponse> list() {
        return medicationService.listAll();
    }

    @GetMapping("/{id}")
    public MedicationResponse get(@PathVariable Long id) {
        return medicationService.getById(id);
    }
}
