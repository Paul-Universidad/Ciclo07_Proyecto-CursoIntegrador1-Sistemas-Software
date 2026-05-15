package com.pharmly.dto.response;

import java.util.List;

public class PreguntaAprendizajeRespuesta {

    private final Long id;
    private final String prompt;
    private final List<OpcionAprendizajeRespuesta> options;

    public PreguntaAprendizajeRespuesta(Long id, String prompt, List<OpcionAprendizajeRespuesta> options) {
        this.id = id;
        this.prompt = prompt;
        this.options = options;
    }

    public Long getId() {
        return id;
    }

    public String getPrompt() {
        return prompt;
    }

    public List<OpcionAprendizajeRespuesta> getOptions() {
        return options;
    }
}
