package com.pharmly.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EstadoControlador {

    @GetMapping("/estado")
    public Map<String, String> estado() {
        return Map.of("status", "ok", "app", "pharmly");
    }
}
