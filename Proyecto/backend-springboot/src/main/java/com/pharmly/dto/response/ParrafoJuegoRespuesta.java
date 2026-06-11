package com.pharmly.dto.response;

/** Párrafo del juego de completar palabras; las palabras ocultas van entre [corchetes]. */
public record ParrafoJuegoRespuesta(Long id, String title, String content) {
}
