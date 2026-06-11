package com.pharmly.dao.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pharmly.model.UsuarioEntidad;

public interface UsuariosJpaRepositorio extends JpaRepository<UsuarioEntidad, Long> {

    Optional<UsuarioEntidad> findByUsernameIgnoreCase(String username);

    boolean existsByUsernameIgnoreCase(String username);
}
