package com.pharmly.dto.response;

/** Estadísticas acumuladas de un minijuego para un usuario. */
public record EstadisticaJuegoRespuesta(String game, int sessions, int questions, int correct) {
}
