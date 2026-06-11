package com.pharmly.dto.response;

/** Resultado de una pregunta dentro de la corrección del quiz. */
public record ResultadoPreguntaQuiz(
        Long questionId,
        Long selectedOptionId,
        Long correctOptionId,
        boolean correct,
        String explanation
) {
}
