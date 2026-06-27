package com.pharmly.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicamento")
public class MedicamentoEntidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String name;

    @Column(name = "nombre_generico")
    private String genericName;

    @Column(name = "descripcion", length = 4000)
    private String description;

    @Column(name = "uso_comun", length = 4000)
    private String commonUsage;

    @Column(name = "precauciones", length = 4000)
    private String precautions;

    @Column(name = "orientacion_dosis", length = 2000)
    private String doseGuidance;

    @Column(name = "efectos_secundarios", length = 4000)
    private String sideEffects;

    @Column(name = "contraindicaciones", length = 4000)
    private String contraindications;

    @Column(name = "interacciones", length = 4000)
    private String interactions;

    @Column(name = "via_administracion")
    private String administrationRoute;

    @Column(name = "requiere_receta")
    private Boolean requiresPrescription;

    @Column(name = "categoria", length = 80)
    private String category;

    @Column(name = "presentacion")
    private String presentation;

    @Column(name = "precio", precision = 10, scale = 2)
    private BigDecimal price;

    public MedicamentoEntidad() {
    }

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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
