package com.medfacil.api.dto;

public class MedicationResponse {

    private final Long id;
    private final String name;
    private final String genericName;
    private final String description;
    private final String commonUsage;
    private final String precautions;
    private final String doseGuidance;
    private final String sideEffects;

    public MedicationResponse(
            Long id,
            String name,
            String genericName,
            String description,
            String commonUsage,
            String precautions,
            String doseGuidance,
            String sideEffects) {
        this.id = id;
        this.name = name;
        this.genericName = genericName;
        this.description = description;
        this.commonUsage = commonUsage;
        this.precautions = precautions;
        this.doseGuidance = doseGuidance;
        this.sideEffects = sideEffects;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getGenericName() {
        return genericName;
    }

    public String getDescription() {
        return description;
    }

    public String getCommonUsage() {
        return commonUsage;
    }

    public String getPrecautions() {
        return precautions;
    }

    public String getDoseGuidance() {
        return doseGuidance;
    }

    public String getSideEffects() {
        return sideEffects;
    }
}
