package com.pharmly.dto.request;

import jakarta.validation.constraints.NotNull;

/** Respuesta del jugador a un caso clínico: diagnóstico y justificación elegidos. */
public record SolicitudRespuestaCaso(
        @NotNull Long caseId,
        @NotNull Long diagnosisOptionId,
        @NotNull Long justificationOptionId) {
}
