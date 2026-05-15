package com.pharmly.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.OpcionesAprendizajeDao;
import com.pharmly.dao.interfaces.PreguntasAprendizajeDao;
import com.pharmly.dto.request.SolicitudRespuestaPregunta;
import com.pharmly.dto.response.OpcionAprendizajeRespuesta;
import com.pharmly.dto.response.PreguntaAprendizajeRespuesta;
import com.pharmly.dto.response.ResultadoRespuestaPregunta;
import com.pharmly.exception.ExcepcionRecursoNoEncontrado;
import com.pharmly.model.OpcionAprendizajeEntidad;
import com.pharmly.model.PreguntaAprendizajeEntidad;
import com.pharmly.service.interfaces.AprendizajeServicio;

@Service
public class AprendizajeServicioImpl implements AprendizajeServicio {

    private final PreguntasAprendizajeDao preguntasAprendizajeDao;
    private final OpcionesAprendizajeDao opcionesAprendizajeDao;

    public AprendizajeServicioImpl(PreguntasAprendizajeDao preguntasAprendizajeDao, OpcionesAprendizajeDao opcionesAprendizajeDao) {
        this.preguntasAprendizajeDao = preguntasAprendizajeDao;
        this.opcionesAprendizajeDao = opcionesAprendizajeDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PreguntaAprendizajeRespuesta> listQuestions() {
        return preguntasAprendizajeDao.findAllWithOptions().stream()
                .map(AprendizajeServicioImpl::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public ResultadoRespuestaPregunta evaluate(SolicitudRespuestaPregunta request) {
        PreguntaAprendizajeEntidad question = preguntasAprendizajeDao.findById(request.questionId())
                .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Pregunta no encontrada: " + request.questionId()));
        OpcionAprendizajeEntidad option = opcionesAprendizajeDao.findById(request.optionId())
                .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Opción no encontrada: " + request.optionId()));
        if (!option.getPregunta().getId().equals(question.getId())) {
            throw new IllegalArgumentException("La opción no pertenece a esa pregunta");
        }
        return new ResultadoRespuestaPregunta(option.isCorrect(), question.getExplanation());
    }

    private static PreguntaAprendizajeRespuesta toResponse(PreguntaAprendizajeEntidad q) {
        List<OpcionAprendizajeRespuesta> options = q.getOpciones().stream()
                .map(o -> new OpcionAprendizajeRespuesta(o.getId(), o.getText()))
                .toList();
        return new PreguntaAprendizajeRespuesta(q.getId(), q.getPrompt(), options);
    }
}
