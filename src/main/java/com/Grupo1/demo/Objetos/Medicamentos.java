package com.Grupo1.demo.Objetos;

public class Medicamentos {

    int id;
    String nombre, indicaciont, eficancia, alternativa;
    String incidencia;
    double precio;

    public Medicamentos() {
    }

    public Medicamentos(int id, String nombre, String indicaciont, String eficancia, String alternativa, String incidencia, double precio) {
        this.id = id;
        this.nombre = nombre;
        this.indicaciont = indicaciont;
        this.eficancia = eficancia;
        this.alternativa = alternativa;
        this.incidencia = incidencia;
        this.precio = precio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getIndicaciont() {
        return indicaciont;
    }

    public void setIndicaciont(String indicaciont) {
        this.indicaciont = indicaciont;
    }

    public String getEficancia() {
        return eficancia;
    }

    public void setEficancia(String eficancia) {
        this.eficancia = eficancia;
    }

    public String getAlternativa() {
        return alternativa;
    }

    public void setAlternativa(String alternativa) {
        this.alternativa = alternativa;
    }

    public String getIncidencia() {
        return incidencia;
    }

    public void setIncidencia(String incidencia) {
        this.incidencia = incidencia;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }



}
