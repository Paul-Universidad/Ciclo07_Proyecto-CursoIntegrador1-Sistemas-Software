package com.pharmly.dto.response;

/** Datos públicos del usuario autenticado (nunca incluye la contraseña). */
public record UsuarioRespuesta(Long id, String username, String fullName, String type) {
}
