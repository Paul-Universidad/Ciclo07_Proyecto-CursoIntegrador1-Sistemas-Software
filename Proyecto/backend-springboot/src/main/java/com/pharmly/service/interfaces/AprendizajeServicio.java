package com.pharmly.service.interfaces;

import java.util.List;

import com.pharmly.dto.request.SolicitudRespuestaPregunta;
import com.pharmly.dto.response.PreguntaAprendizajeRespuesta;
import com.pharmly.dto.response.ResultadoRespuestaPregunta;

public interface AprendizajeServicio {

    List<PreguntaAprendizajeRespuesta> listQuestions();

    ResultadoRespuestaPregunta evaluate(SolicitudRespuestaPregunta request);
}
