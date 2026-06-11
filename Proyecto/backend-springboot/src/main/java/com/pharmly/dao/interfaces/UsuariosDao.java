package com.pharmly.dao.interfaces;

import java.util.Optional;

import com.pharmly.model.UsuarioEntidad;

public interface UsuariosDao {

    Optional<UsuarioEntidad> findByUsernameIgnoreCase(String username);
}
