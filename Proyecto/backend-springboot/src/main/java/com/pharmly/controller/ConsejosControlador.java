package com.pharmly.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.request.SolicitudConsejo;
import com.pharmly.dto.response.RespuestaConsejo;
import com.pharmly.service.interfaces.ConsejosServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/consejos")
public class ConsejosControlador {

    private final ConsejosServicio consejosServicio;

    public ConsejosControlador(ConsejosServicio consejosServicio) {
        this.consejosServicio = consejosServicio;
    }

    @PostMapping
    public RespuestaConsejo consejo(@Valid @RequestBody SolicitudConsejo solicitud) {
        return consejosServicio.evaluar(solicitud);
    }
}
