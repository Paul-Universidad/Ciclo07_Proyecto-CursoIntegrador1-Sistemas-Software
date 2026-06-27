package com.pharmly.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.request.SolicitudActividad;
import com.pharmly.dto.request.SolicitudCorreccionQuiz;
import com.pharmly.dto.request.SolicitudRespuestaCaso;
import com.pharmly.dto.response.CasoClinicoRespuesta;
import com.pharmly.dto.response.EstadisticasAprendizajeRespuesta;
import com.pharmly.dto.response.ParrafoJuegoRespuesta;
import com.pharmly.dto.response.PreguntaAprendizajeRespuesta;
import com.pharmly.dto.response.ResultadoCasoRespuesta;
import com.pharmly.dto.response.ResultadoQuizRespuesta;
import com.pharmly.service.interfaces.AprendizajeServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/aprendizaje")
public class AprendizajeControlador {

    private final AprendizajeServicio aprendizajeServicio;

    public AprendizajeControlador(AprendizajeServicio aprendizajeServicio) {
        this.aprendizajeServicio = aprendizajeServicio;
    }

    /** Devuelve preguntas aleatorias para el quiz (por defecto 10). */
    @GetMapping("/quiz")
    public List<PreguntaAprendizajeRespuesta> quiz(
            @RequestParam(name = "cantidad", defaultValue = "10") int cantidad) {
        return aprendizajeServicio.randomQuestions(cantidad);
    }

    /** Corrige todas las respuestas marcadas y devuelve el detalle. */
    @PostMapping("/quiz/corregir")
    public ResultadoQuizRespuesta corregir(@Valid @RequestBody SolicitudCorreccionQuiz solicitud) {
        return aprendizajeServicio.grade(solicitud);
    }

    /** Devuelve un párrafo aleatorio del juego de completar palabras. */
    @GetMapping("/parrafos/aleatorio")
    public ParrafoJuegoRespuesta parrafoAleatorio(
            @RequestParam(name = "excluirId", required = false) Long excluirId) {
        return aprendizajeServicio.randomParagraph(excluirId);
    }

    /** Devuelve un caso clínico aleatorio del "Tutorial para ser médico". */
    @GetMapping("/casos/aleatorio")
    public CasoClinicoRespuesta casoAleatorio(
            @RequestParam(name = "excluirId", required = false) Long excluirId) {
        return aprendizajeServicio.randomCase(excluirId);
    }

    /** Corrige el diagnóstico y la justificación elegidos para un caso. */
    @PostMapping("/casos/responder")
    public ResultadoCasoRespuesta responderCaso(@Valid @RequestBody SolicitudRespuestaCaso solicitud) {
        return aprendizajeServicio.gradeCase(solicitud);
    }

    /** Registra una partida jugada (para las estadísticas del panel). */
    @PostMapping("/actividad")
    @ResponseStatus(HttpStatus.CREATED)
    public void registrarActividad(@Valid @RequestBody SolicitudActividad solicitud) {
        aprendizajeServicio.recordActivity(solicitud);
    }

    /** Estadísticas de los minijuegos para el panel del usuario. */
    @GetMapping("/estadisticas")
    public EstadisticasAprendizajeRespuesta estadisticas(@RequestParam("usuarioId") Long usuarioId) {
        return aprendizajeServicio.statsForUser(usuarioId);
    }
}
