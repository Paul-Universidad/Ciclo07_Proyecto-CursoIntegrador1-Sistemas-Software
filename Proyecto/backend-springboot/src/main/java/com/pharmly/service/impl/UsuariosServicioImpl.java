package com.pharmly.service.impl;

import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.UsuariosDao;
import com.pharmly.dto.request.SolicitudRegistro;
import com.pharmly.dto.response.UsuarioRespuesta;
import com.pharmly.model.UsuarioEntidad;
import com.pharmly.service.interfaces.UsuariosServicio;

@Service
public class UsuariosServicioImpl implements UsuariosServicio {

    private static final Set<String> TIPOS_REGISTRO = Set.of("USUARIO_GENERAL", "ESTUDIANTE");

    private final UsuariosDao usuariosDao;

    public UsuariosServicioImpl(UsuariosDao usuariosDao) {
        this.usuariosDao = usuariosDao;
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioRespuesta login(String username, String password) {
        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            throw new IllegalArgumentException("Ingrese usuario y contraseña");
        }
        UsuarioEntidad usuario = usuariosDao.findByUsernameIgnoreCase(username.trim())
                .filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new IllegalArgumentException("Usuario o contraseña incorrectos"));
        return toResponse(usuario);
    }

    @Override
    @Transactional
    public UsuarioRespuesta register(SolicitudRegistro solicitud) {
        String username = solicitud.username().trim();
        String tipo = solicitud.type().trim().toUpperCase();
        if (!TIPOS_REGISTRO.contains(tipo)) {
            throw new IllegalArgumentException("Tipo de cuenta inválido: elija Usuario general o Estudiante");
        }
        if (usuariosDao.existsByUsernameIgnoreCase(username)) {
            throw new IllegalArgumentException("El nombre de usuario '" + username + "' ya está en uso");
        }
        UsuarioEntidad nuevo = new UsuarioEntidad();
        nuevo.setUsername(username);
        nuevo.setPassword(solicitud.password());
        nuevo.setType(tipo);
        nuevo.setFullName(solicitud.fullName().trim());
        nuevo.setEmail(solicitud.email() == null || solicitud.email().isBlank() ? null : solicitud.email().trim());
        return toResponse(usuariosDao.save(nuevo));
    }

    private static UsuarioRespuesta toResponse(UsuarioEntidad usuario) {
        return new UsuarioRespuesta(usuario.getId(), usuario.getUsername(), usuario.getFullName(), usuario.getType());
    }
}
