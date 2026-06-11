package com.pharmly.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

/** Respuestas marcadas por el usuario para corregir un quiz completo. */
public record SolicitudCorreccionQuiz(
        @NotEmpty(message = "Debe enviar al menos una respuesta")
        @Valid List<SolicitudRespuestaPregunta> answers
) {
}
