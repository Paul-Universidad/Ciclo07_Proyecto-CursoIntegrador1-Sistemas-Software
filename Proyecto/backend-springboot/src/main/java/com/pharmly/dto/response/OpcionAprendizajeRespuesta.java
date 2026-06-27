package com.pharmly.dto.response;

public class OpcionAprendizajeRespuesta {

    private final Long id;
    private final String text;

    public OpcionAprendizajeRespuesta(Long id, String text) {
        this.id = id;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }
}
