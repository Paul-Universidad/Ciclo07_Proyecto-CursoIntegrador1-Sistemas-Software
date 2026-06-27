package com.pharmly.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.response.ResumenInicioRespuesta;
import com.pharmly.service.interfaces.InicioServicioAplicacion;

@RestController
@RequestMapping("/api/inicio")
public class InicioControlador {

    private final InicioServicioAplicacion inicioServicioAplicacion;

    public InicioControlador(InicioServicioAplicacion inicioServicioAplicacion) {
        this.inicioServicioAplicacion = inicioServicioAplicacion;
    }

    @GetMapping("/resumen")
    public ResumenInicioRespuesta resumen() {
        return inicioServicioAplicacion.summary();
    }
}
