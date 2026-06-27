package com.pharmly.dto.response;

import java.util.List;

/** Caso clínico del "Tutorial para ser médico" con sus opciones barajadas. */
public record CasoClinicoRespuesta(
        Long id,
        String title,
        String profile,
        List<OpcionCasoRespuesta> diagnoses,
        List<OpcionCasoRespuesta> justifications) {
}
