package com.pharmly.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.ParrafosJuegoDao;
import com.pharmly.dao.interfaces.PreguntasAprendizajeDao;
import com.pharmly.dto.request.SolicitudCorreccionQuiz;
import com.pharmly.dto.request.SolicitudRespuestaPregunta;
import com.pharmly.dto.response.OpcionAprendizajeRespuesta;
import com.pharmly.dto.response.ParrafoJuegoRespuesta;
import com.pharmly.dto.response.PreguntaAprendizajeRespuesta;
import com.pharmly.dto.response.ResultadoPreguntaQuiz;
import com.pharmly.dto.response.ResultadoQuizRespuesta;
import com.pharmly.exception.ExcepcionRecursoNoEncontrado;
import com.pharmly.model.OpcionAprendizajeEntidad;
import com.pharmly.model.ParrafoJuegoEntidad;
import com.pharmly.model.PreguntaAprendizajeEntidad;
import com.pharmly.service.interfaces.AprendizajeServicio;

@Service
public class AprendizajeServicioImpl implements AprendizajeServicio {

    private final PreguntasAprendizajeDao preguntasAprendizajeDao;
    private final ParrafosJuegoDao parrafosJuegoDao;

    public AprendizajeServicioImpl(PreguntasAprendizajeDao preguntasAprendizajeDao, ParrafosJuegoDao parrafosJuegoDao) {
        this.preguntasAprendizajeDao = preguntasAprendizajeDao;
        this.parrafosJuegoDao = parrafosJuegoDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PreguntaAprendizajeRespuesta> randomQuestions(int cantidad) {
        List<PreguntaAprendizajeEntidad> todas = new ArrayList<>(preguntasAprendizajeDao.findAllWithOptions());
        Collections.shuffle(todas);
        return todas.stream()
                .limit(Math.max(1, cantidad))
                .map(AprendizajeServicioImpl::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ResultadoQuizRespuesta grade(SolicitudCorreccionQuiz solicitud) {
        Map<Long, PreguntaAprendizajeEntidad> preguntas = preguntasAprendizajeDao.findAllWithOptions().stream()
                .collect(Collectors.toMap(PreguntaAprendizajeEntidad::getId, Function.identity()));

        List<ResultadoPreguntaQuiz> resultados = new ArrayList<>();
        int correctas = 0;
        for (SolicitudRespuestaPregunta respuesta : solicitud.answers()) {
            PreguntaAprendizajeEntidad pregunta = preguntas.get(respuesta.questionId());
            if (pregunta == null) {
                throw new ExcepcionRecursoNoEncontrado("Pregunta no encontrada: " + respuesta.questionId());
            }
            OpcionAprendizajeEntidad correcta = pregunta.getOpciones().stream()
                    .filter(OpcionAprendizajeEntidad::isCorrect)
                    .findFirst()
                    .orElseThrow(() -> new ExcepcionRecursoNoEncontrado(
                            "La pregunta " + pregunta.getId() + " no tiene alternativa correcta configurada"));
            boolean acierto = correcta.getId().equals(respuesta.optionId());
            if (acierto) {
                correctas++;
            }
            resultados.add(new ResultadoPreguntaQuiz(
                    pregunta.getId(),
                    respuesta.optionId(),
                    correcta.getId(),
                    acierto,
                    pregunta.getExplanation()));
        }
        return new ResultadoQuizRespuesta(resultados.size(), correctas, resultados);
    }

    @Override
    @Transactional(readOnly = true)
    public ParrafoJuegoRespuesta randomParagraph(Long excluirId) {
        List<ParrafoJuegoEntidad> parrafos = new ArrayList<>(parrafosJuegoDao.findAll());
        if (parrafos.isEmpty()) {
            throw new ExcepcionRecursoNoEncontrado("No hay párrafos registrados para el juego");
        }
        if (excluirId != null && parrafos.size() > 1) {
            parrafos.removeIf(p -> p.getId().equals(excluirId));
        }
        ParrafoJuegoEntidad elegido = parrafos.get(ThreadLocalRandom.current().nextInt(parrafos.size()));
        return new ParrafoJuegoRespuesta(elegido.getId(), elegido.getTitle(), elegido.getContent());
    }

    private static PreguntaAprendizajeRespuesta toResponse(PreguntaAprendizajeEntidad q) {
        List<OpcionAprendizajeRespuesta> options = q.getOpciones().stream()
                .map(o -> new OpcionAprendizajeRespuesta(o.getId(), o.getText()))
                .toList();
        return new PreguntaAprendizajeRespuesta(q.getId(), q.getPrompt(), options);
    }
}
