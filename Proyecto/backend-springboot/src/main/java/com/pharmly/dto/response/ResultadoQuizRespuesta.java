package com.pharmly.dto.response;

import java.util.List;

/** Resultado global de la corrección de un quiz. */
public record ResultadoQuizRespuesta(
        int total,
        int correctas,
        List<ResultadoPreguntaQuiz> resultados
) {
}
