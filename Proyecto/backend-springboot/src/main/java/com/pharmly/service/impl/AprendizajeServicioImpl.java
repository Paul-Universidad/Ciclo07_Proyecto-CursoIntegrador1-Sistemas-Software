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

import com.pharmly.dao.interfaces.ActividadesAprendizajeDao;
import com.pharmly.dao.interfaces.CasosClinicosDao;
import com.pharmly.dao.interfaces.ParrafosJuegoDao;
import com.pharmly.dao.interfaces.PreguntasAprendizajeDao;
import com.pharmly.dto.request.SolicitudActividad;
import com.pharmly.dto.request.SolicitudCorreccionQuiz;
import com.pharmly.dto.request.SolicitudRespuestaCaso;
import com.pharmly.dto.request.SolicitudRespuestaPregunta;
import com.pharmly.dto.response.ActividadRespuesta;
import com.pharmly.dto.response.CasoClinicoRespuesta;
import com.pharmly.dto.response.EstadisticaJuegoRespuesta;
import com.pharmly.dto.response.EstadisticasAprendizajeRespuesta;
import com.pharmly.dto.response.OpcionAprendizajeRespuesta;
import com.pharmly.dto.response.OpcionCasoRespuesta;
import com.pharmly.dto.response.ParrafoJuegoRespuesta;
import com.pharmly.dto.response.PreguntaAprendizajeRespuesta;
import com.pharmly.dto.response.ResultadoCasoRespuesta;
import com.pharmly.dto.response.ResultadoPreguntaQuiz;
import com.pharmly.dto.response.ResultadoQuizRespuesta;
import com.pharmly.exception.ExcepcionRecursoNoEncontrado;
import com.pharmly.model.ActividadAprendizajeEntidad;
import com.pharmly.model.CasoClinicoEntidad;
import com.pharmly.model.OpcionAprendizajeEntidad;
import com.pharmly.model.OpcionCasoClinicoEntidad;
import com.pharmly.model.ParrafoJuegoEntidad;
import com.pharmly.model.PreguntaAprendizajeEntidad;
import com.pharmly.service.interfaces.AprendizajeServicio;

@Service
public class AprendizajeServicioImpl implements AprendizajeServicio {

    private static final java.util.Set<String> JUEGOS_VALIDOS = java.util.Set.of("QUIZ", "COMPLETAR", "CASOS");

    private final PreguntasAprendizajeDao preguntasAprendizajeDao;
    private final ParrafosJuegoDao parrafosJuegoDao;
    private final CasosClinicosDao casosClinicosDao;
    private final ActividadesAprendizajeDao actividadesAprendizajeDao;

    public AprendizajeServicioImpl(PreguntasAprendizajeDao preguntasAprendizajeDao, ParrafosJuegoDao parrafosJuegoDao,
            CasosClinicosDao casosClinicosDao, ActividadesAprendizajeDao actividadesAprendizajeDao) {
        this.preguntasAprendizajeDao = preguntasAprendizajeDao;
        this.parrafosJuegoDao = parrafosJuegoDao;
        this.casosClinicosDao = casosClinicosDao;
        this.actividadesAprendizajeDao = actividadesAprendizajeDao;
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

    @Override
    @Transactional(readOnly = true)
    public CasoClinicoRespuesta randomCase(Long excluirId) {
        List<CasoClinicoEntidad> casos = new ArrayList<>(casosClinicosDao.findAllWithOptions());
        if (casos.isEmpty()) {
            throw new ExcepcionRecursoNoEncontrado("No hay casos clínicos registrados");
        }
        if (excluirId != null && casos.size() > 1) {
            casos.removeIf(c -> c.getId().equals(excluirId));
        }
        CasoClinicoEntidad elegido = casos.get(ThreadLocalRandom.current().nextInt(casos.size()));

        List<OpcionCasoRespuesta> diagnosticos = opcionesPorTipo(elegido, OpcionCasoClinicoEntidad.TIPO_DIAGNOSTICO);
        List<OpcionCasoRespuesta> justificaciones = opcionesPorTipo(elegido, OpcionCasoClinicoEntidad.TIPO_JUSTIFICACION);
        return new CasoClinicoRespuesta(elegido.getId(), elegido.getTitle(), elegido.getProfile(),
                diagnosticos, justificaciones);
    }

    @Override
    @Transactional(readOnly = true)
    public ResultadoCasoRespuesta gradeCase(SolicitudRespuestaCaso solicitud) {
        CasoClinicoEntidad caso = casosClinicosDao.findByIdWithOptions(solicitud.caseId())
                .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Caso clínico no encontrado: " + solicitud.caseId()));

        OpcionCasoClinicoEntidad diagnosticoCorrecto = correctaPorTipo(caso, OpcionCasoClinicoEntidad.TIPO_DIAGNOSTICO);
        OpcionCasoClinicoEntidad justificacionCorrecta = correctaPorTipo(caso, OpcionCasoClinicoEntidad.TIPO_JUSTIFICACION);

        return new ResultadoCasoRespuesta(
                caso.getId(),
                diagnosticoCorrecto.getId().equals(solicitud.diagnosisOptionId()),
                justificacionCorrecta.getId().equals(solicitud.justificationOptionId()),
                diagnosticoCorrecto.getId(),
                justificacionCorrecta.getId(),
                caso.getExplanation());
    }

    @Override
    @Transactional
    public void recordActivity(SolicitudActividad solicitud) {
        String juego = solicitud.game().trim().toUpperCase();
        if (!JUEGOS_VALIDOS.contains(juego)) {
            throw new IllegalArgumentException("Juego inválido: " + solicitud.game());
        }
        if (solicitud.correct() > solicitud.total()) {
            throw new IllegalArgumentException("Los aciertos no pueden superar el total");
        }
        ActividadAprendizajeEntidad actividad = new ActividadAprendizajeEntidad();
        actividad.setUserId(solicitud.userId());
        actividad.setGame(juego);
        actividad.setTotal(solicitud.total());
        actividad.setCorrect(solicitud.correct());
        actividadesAprendizajeDao.save(actividad);
    }

    @Override
    @Transactional(readOnly = true)
    public EstadisticasAprendizajeRespuesta statsForUser(Long userId) {
        List<ActividadAprendizajeEntidad> actividades =
                actividadesAprendizajeDao.findByUserIdOrderByDateDesc(userId);

        int totalSesiones = actividades.size();
        int totalPreguntas = actividades.stream().mapToInt(ActividadAprendizajeEntidad::getTotal).sum();
        int totalAciertos = actividades.stream().mapToInt(ActividadAprendizajeEntidad::getCorrect).sum();

        List<EstadisticaJuegoRespuesta> porJuego = JUEGOS_VALIDOS.stream()
                .sorted()
                .map(juego -> {
                    List<ActividadAprendizajeEntidad> delJuego = actividades.stream()
                            .filter(a -> juego.equals(a.getGame()))
                            .toList();
                    return new EstadisticaJuegoRespuesta(
                            juego,
                            delJuego.size(),
                            delJuego.stream().mapToInt(ActividadAprendizajeEntidad::getTotal).sum(),
                            delJuego.stream().mapToInt(ActividadAprendizajeEntidad::getCorrect).sum());
                })
                .toList();

        List<ActividadRespuesta> recientes = actividades.stream()
                .limit(10)
                .map(a -> new ActividadRespuesta(a.getGame(), a.getTotal(), a.getCorrect(), a.getDate()))
                .toList();

        return new EstadisticasAprendizajeRespuesta(
                totalSesiones, totalPreguntas, totalAciertos, porJuego, recientes);
    }

    private static List<OpcionCasoRespuesta> opcionesPorTipo(CasoClinicoEntidad caso, String tipo) {
        List<OpcionCasoRespuesta> opciones = caso.getOpciones().stream()
                .filter(o -> tipo.equals(o.getType()))
                .map(o -> new OpcionCasoRespuesta(o.getId(), o.getText()))
                .collect(Collectors.toCollection(ArrayList::new));
        Collections.shuffle(opciones);
        return opciones;
    }

    private static OpcionCasoClinicoEntidad correctaPorTipo(CasoClinicoEntidad caso, String tipo) {
        return caso.getOpciones().stream()
                .filter(o -> tipo.equals(o.getType()) && o.isCorrect())
                .findFirst()
                .orElseThrow(() -> new ExcepcionRecursoNoEncontrado(
                        "El caso " + caso.getId() + " no tiene opción correcta de tipo " + tipo));
    }

    private static PreguntaAprendizajeRespuesta toResponse(PreguntaAprendizajeEntidad q) {
        List<OpcionAprendizajeRespuesta> options = q.getOpciones().stream()
                .map(o -> new OpcionAprendizajeRespuesta(o.getId(), o.getText()))
                .toList();
        return new PreguntaAprendizajeRespuesta(q.getId(), q.getPrompt(), options);
    }
}
