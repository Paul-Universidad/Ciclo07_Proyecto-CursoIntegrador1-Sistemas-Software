package com.pharmly.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Sirve la SPA React (build en {@code classpath:/static/index.html}) para rutas del cliente.
 */
@Controller
public class SpaController {

    @GetMapping({
            "/inicio",
            "/panel",
            "/consulta",
            "/repaso",
            "/consejos",
            "/medicamentos",
            "/medicamentos/**"
    })
    public String spa() {
        return "forward:/index.html";
    }
}
