package com.pharmly.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.response.UsuarioRespuesta;
import com.pharmly.service.interfaces.UsuariosServicio;

@RestController
@RequestMapping("/api/usuarios")
public class UsuariosControlador {

    private final UsuariosServicio usuariosServicio;

    public UsuariosControlador(UsuariosServicio usuariosServicio) {
        this.usuariosServicio = usuariosServicio;
    }

    /**
     * Inicio de sesión vía GET, p.ej.:
     * GET /api/usuarios/login?usuario=admin&contrasenia=admin123
     */
    @GetMapping("/login")
    public UsuarioRespuesta login(
            @RequestParam("usuario") String usuario,
            @RequestParam("contrasenia") String contrasenia) {
        return usuariosServicio.login(usuario, contrasenia);
    }
}
