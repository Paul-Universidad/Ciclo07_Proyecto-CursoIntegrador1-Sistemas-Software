package com.pharmly.service.interfaces;

import java.util.List;

import com.pharmly.dto.request.SolicitudActividad;
import com.pharmly.dto.request.SolicitudCorreccionQuiz;
import com.pharmly.dto.request.SolicitudRespuestaCaso;
import com.pharmly.dto.response.CasoClinicoRespuesta;
import com.pharmly.dto.response.EstadisticasAprendizajeRespuesta;
import com.pharmly.dto.response.ParrafoJuegoRespuesta;
import com.pharmly.dto.response.PreguntaAprendizajeRespuesta;
import com.pharmly.dto.response.ResultadoCasoRespuesta;
import com.pharmly.dto.response.ResultadoQuizRespuesta;

public interface AprendizajeServicio {

    /** Devuelve {@code cantidad} preguntas aleatorias con sus alternativas. */
    List<PreguntaAprendizajeRespuesta> randomQuestions(int cantidad);

    /** Corrige las respuestas marcadas y devuelve el detalle por pregunta. */
    ResultadoQuizRespuesta grade(SolicitudCorreccionQuiz solicitud);

    /** Devuelve un párrafo aleatorio del juego de completar palabras (opcionalmente distinto al actual). */
    ParrafoJuegoRespuesta randomParagraph(Long excluirId);

    /** Devuelve un caso clínico aleatorio del "Tutorial para ser médico" (opcionalmente distinto al actual). */
    CasoClinicoRespuesta randomCase(Long excluirId);

    /** Corrige el diagnóstico y la justificación elegidos para un caso clínico. */
    ResultadoCasoRespuesta gradeCase(SolicitudRespuestaCaso solicitud);

    /** Registra una partida jugada por el usuario en un minijuego. */
    void recordActivity(SolicitudActividad solicitud);

    /** Estadísticas acumuladas y actividad reciente del usuario en los minijuegos. */
    EstadisticasAprendizajeRespuesta statsForUser(Long userId);
}
