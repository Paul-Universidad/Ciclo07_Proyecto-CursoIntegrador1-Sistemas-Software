package com.pharmly.dto.response;

import java.time.LocalDateTime;

/** Una partida registrada, para el historial del panel. */
public record ActividadRespuesta(String game, int total, int correct, LocalDateTime date) {
}
