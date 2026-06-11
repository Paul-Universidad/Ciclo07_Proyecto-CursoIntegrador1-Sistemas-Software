package com.pharmly.service.interfaces;

import java.util.List;

import com.pharmly.dto.request.SolicitudCorreccionQuiz;
import com.pharmly.dto.response.ParrafoJuegoRespuesta;
import com.pharmly.dto.response.PreguntaAprendizajeRespuesta;
import com.pharmly.dto.response.ResultadoQuizRespuesta;

public interface AprendizajeServicio {

    /** Devuelve {@code cantidad} preguntas aleatorias con sus alternativas. */
    List<PreguntaAprendizajeRespuesta> randomQuestions(int cantidad);

    /** Corrige las respuestas marcadas y devuelve el detalle por pregunta. */
    ResultadoQuizRespuesta grade(SolicitudCorreccionQuiz solicitud);

    /** Devuelve un párrafo aleatorio del juego de completar palabras (opcionalmente distinto al actual). */
    ParrafoJuegoRespuesta randomParagraph(Long excluirId);
}
