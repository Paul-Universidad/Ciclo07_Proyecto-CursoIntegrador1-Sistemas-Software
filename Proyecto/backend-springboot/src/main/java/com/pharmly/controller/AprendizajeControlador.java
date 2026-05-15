package com.pharmly.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.request.SolicitudRespuestaPregunta;
import com.pharmly.dto.response.PreguntaAprendizajeRespuesta;
import com.pharmly.dto.response.ResultadoRespuestaPregunta;
import com.pharmly.service.interfaces.AprendizajeServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/aprendizaje")
public class AprendizajeControlador {

    private final AprendizajeServicio aprendizajeServicio;

    public AprendizajeControlador(AprendizajeServicio aprendizajeServicio) {
        this.aprendizajeServicio = aprendizajeServicio;
    }

    @GetMapping("/preguntas")
    public List<PreguntaAprendizajeRespuesta> preguntas() {
        return aprendizajeServicio.listQuestions();
    }

    @PostMapping("/respuesta")
    public ResultadoRespuestaPregunta respuesta(@Valid @RequestBody SolicitudRespuestaPregunta solicitud) {
        return aprendizajeServicio.evaluate(solicitud);
    }
}
