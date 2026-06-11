package com.pharmly.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.response.ResultadoBusquedaRespuesta;
import com.pharmly.service.interfaces.BusquedaServicio;

@RestController
@RequestMapping("/api/busqueda")
public class BusquedaControlador {

    private final BusquedaServicio busquedaServicio;

    public BusquedaControlador(BusquedaServicio busquedaServicio) {
        this.busquedaServicio = busquedaServicio;
    }

    /** Búsqueda combinada: GET /api/busqueda?q=paracetamol */
    @GetMapping
    public ResultadoBusquedaRespuesta buscar(@RequestParam(name = "q", required = false) String q) {
        return busquedaServicio.search(q);
    }
}
