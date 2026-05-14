package com.pharmly.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.request.MedicationForm;
import com.pharmly.dto.response.MedicationResponse;
import com.pharmly.service.interfaces.MedicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    private final MedicationService medicationService;

    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @GetMapping("/search")
    public List<MedicationResponse> search(@RequestParam("q") String q) {
        return medicationService.search(q);
    }

    @GetMapping
    public List<MedicationResponse> list() {
        return medicationService.listAll();
    }

    @GetMapping("/{id}")
    public MedicationResponse get(@PathVariable Long id) {
        return medicationService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MedicationResponse create(@Valid @RequestBody MedicationForm form) {
        return medicationService.create(form);
    }

    @PutMapping("/{id}")
    public MedicationResponse update(@PathVariable Long id, @Valid @RequestBody MedicationForm form) {
        return medicationService.update(id, form);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        medicationService.deleteById(id);
    }
}
