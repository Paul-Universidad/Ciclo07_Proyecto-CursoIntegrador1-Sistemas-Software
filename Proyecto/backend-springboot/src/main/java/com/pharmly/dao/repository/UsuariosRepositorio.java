package com.pharmly.dao.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.UsuariosDao;
import com.pharmly.model.UsuarioEntidad;

@Repository
public class UsuariosRepositorio implements UsuariosDao {

    private final UsuariosJpaRepositorio usuariosJpaRepositorio;

    public UsuariosRepositorio(UsuariosJpaRepositorio usuariosJpaRepositorio) {
        this.usuariosJpaRepositorio = usuariosJpaRepositorio;
    }

    @Override
    public Optional<UsuarioEntidad> findByUsernameIgnoreCase(String username) {
        return usuariosJpaRepositorio.findByUsernameIgnoreCase(username);
    }
}
