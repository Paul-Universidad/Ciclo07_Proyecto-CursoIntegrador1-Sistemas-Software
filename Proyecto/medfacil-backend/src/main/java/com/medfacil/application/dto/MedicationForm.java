package com.medfacil.application.dto;

import com.medfacil.api.dto.MedicationResponse;

import jakarta.validation.constraints.NotBlank;

/**
 * Formulario MVC para crear/editar medicamentos en el catálogo.
 */
public class MedicationForm {

    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    private String genericName;
    private String description;
    private String commonUsage;
    private String precautions;
    private String doseGuidance;
    private String sideEffects;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenericName() {
        return genericName;
    }

    public void setGenericName(String genericName) {
        this.genericName = genericName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCommonUsage() {
        return commonUsage;
    }

    public void setCommonUsage(String commonUsage) {
        this.commonUsage = commonUsage;
    }

    public String getPrecautions() {
        return precautions;
    }

    public void setPrecautions(String precautions) {
        this.precautions = precautions;
    }

    public String getDoseGuidance() {
        return doseGuidance;
    }

    public void setDoseGuidance(String doseGuidance) {
        this.doseGuidance = doseGuidance;
    }

    public String getSideEffects() {
        return sideEffects;
    }

    public void setSideEffects(String sideEffects) {
        this.sideEffects = sideEffects;
    }

    public static MedicationForm empty() {
        return new MedicationForm();
    }

    public static MedicationForm from(MedicationResponse r) {
        MedicationForm f = new MedicationForm();
        f.setId(r.getId());
        f.setName(r.getName());
        f.setGenericName(r.getGenericName());
        f.setDescription(r.getDescription());
        f.setCommonUsage(r.getCommonUsage());
        f.setPrecautions(r.getPrecautions());
        f.setDoseGuidance(r.getDoseGuidance());
        f.setSideEffects(r.getSideEffects());
        return f;
    }
}
