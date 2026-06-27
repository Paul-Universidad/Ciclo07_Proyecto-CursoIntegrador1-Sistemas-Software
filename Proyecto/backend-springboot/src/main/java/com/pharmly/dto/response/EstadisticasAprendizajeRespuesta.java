package com.pharmly.dto.response;

import java.util.List;

/** Resumen de la actividad de un usuario en los minijuegos (para el panel). */
public record EstadisticasAprendizajeRespuesta(
        int totalSessions,
        int totalQuestions,
        int totalCorrect,
        List<EstadisticaJuegoRespuesta> perGame,
        List<ActividadRespuesta> recent) {
}
