package com.pharmly.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Datos para crear una cuenta nueva (solo USUARIO_GENERAL o ESTUDIANTE). */
public record SolicitudRegistro(
        @NotBlank @Size(min = 3, max = 80) String username,
        @NotBlank @Size(min = 4, max = 100) String password,
        @NotBlank @Size(max = 255) String fullName,
        @NotBlank String type,
        String email) {
}
