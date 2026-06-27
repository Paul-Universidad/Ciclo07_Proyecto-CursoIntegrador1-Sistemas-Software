package com.pharmly.dto.request;

import com.pharmly.dto.response.MedicamentoRespuesta;

import jakarta.validation.constraints.NotBlank;

/**
 * Formulario para crear/editar medicamentos en el catálogo.
 */
public class MedicamentoFormulario {

    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    private String genericName;
    private String description;
    private String commonUsage;
    private String precautions;
    private String doseGuidance;
    private String sideEffects;
    private String contraindications;
    private String interactions;
    private String administrationRoute;
    private Boolean requiresPrescription;
    private String category;
    private String presentation;
    /** Texto decimal opcional (ej. 12.50) */
    private String price;

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

    public String getContraindications() {
        return contraindications;
    }

    public void setContraindications(String contraindications) {
        this.contraindications = contraindications;
    }

    public String getInteractions() {
        return interactions;
    }

    public void setInteractions(String interactions) {
        this.interactions = interactions;
    }

    public String getAdministrationRoute() {
        return administrationRoute;
    }

    public void setAdministrationRoute(String administrationRoute) {
        this.administrationRoute = administrationRoute;
    }

    public Boolean getRequiresPrescription() {
        return requiresPrescription;
    }

    public void setRequiresPrescription(Boolean requiresPrescription) {
        this.requiresPrescription = requiresPrescription;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPresentation() {
        return presentation;
    }

    public void setPresentation(String presentation) {
        this.presentation = presentation;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public static MedicamentoFormulario empty() {
        return new MedicamentoFormulario();
    }

    public static MedicamentoFormulario from(MedicamentoRespuesta r) {
        MedicamentoFormulario f = new MedicamentoFormulario();
        f.setId(r.getId());
        f.setName(r.getName());
        f.setGenericName(r.getGenericName());
        f.setDescription(r.getDescription());
        f.setCommonUsage(r.getCommonUsage());
        f.setPrecautions(r.getPrecautions());
        f.setDoseGuidance(r.getDoseGuidance());
        f.setSideEffects(r.getSideEffects());
        f.setContraindications(r.getContraindications());
        f.setInteractions(r.getInteractions());
        f.setAdministrationRoute(r.getAdministrationRoute());
        f.setRequiresPrescription(r.getRequiresPrescription());
        f.setCategory(r.getCategory());
        f.setPresentation(r.getPresentation());
        if (r.getPrice() != null) {
            f.setPrice(r.getPrice().stripTrailingZeros().toPlainString());
        }
        return f;
    }
}
