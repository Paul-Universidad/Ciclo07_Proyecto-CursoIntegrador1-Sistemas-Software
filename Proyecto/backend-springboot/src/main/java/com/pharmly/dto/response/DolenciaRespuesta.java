package com.pharmly.dto.response;

/** Ficha de una dolencia para el módulo de búsqueda. */
public record DolenciaRespuesta(
        Long id,
        String name,
        String category,
        String description,
        String symptoms,
        String advice) {
}
