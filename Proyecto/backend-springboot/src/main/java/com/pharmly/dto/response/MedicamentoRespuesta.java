package com.pharmly.dto.response;

import java.math.BigDecimal;

public class MedicamentoRespuesta {

    private final Long id;
    private final String name;
    private final String genericName;
    private final String description;
    private final String commonUsage;
    private final String precautions;
    private final String doseGuidance;
    private final String sideEffects;
    private final String category;
    private final String presentation;
    private final BigDecimal price;

    public MedicamentoRespuesta(
            Long id,
            String name,
            String genericName,
            String description,
            String commonUsage,
            String precautions,
            String doseGuidance,
            String sideEffects,
            String category,
            String presentation,
            BigDecimal price) {
        this.id = id;
        this.name = name;
        this.genericName = genericName;
        this.description = description;
        this.commonUsage = commonUsage;
        this.precautions = precautions;
        this.doseGuidance = doseGuidance;
        this.sideEffects = sideEffects;
        this.category = category;
        this.presentation = presentation;
        this.price = price;
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

    public String getCategory() {
        return category;
    }

    public String getPresentation() {
        return presentation;
    }

    public BigDecimal getPrice() {
        return price;
    }

    /** Alias para la vista de búsqueda (mismo valor que orientación de dosis). */
    public String getDose() {
        return doseGuidance;
    }

    /** Alias para la vista de búsqueda (mismo texto que precauciones). */
    public String getWarning() {
        return precautions;
    }
}
