package com.pharmly.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/** Registro de una partida jugada: juego QUIZ, COMPLETAR o CASOS. */
public record SolicitudActividad(
        @NotNull Long userId,
        @NotBlank String game,
        @Min(1) int total,
        @Min(0) int correct) {
}
