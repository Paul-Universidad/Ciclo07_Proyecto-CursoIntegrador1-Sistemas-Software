package com.pharmly.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.UsuariosDao;
import com.pharmly.dto.response.UsuarioRespuesta;
import com.pharmly.model.UsuarioEntidad;
import com.pharmly.service.interfaces.UsuariosServicio;

@Service
public class UsuariosServicioImpl implements UsuariosServicio {

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
        return new UsuarioRespuesta(usuario.getId(), usuario.getUsername(), usuario.getFullName(), usuario.getType());
    }
}
