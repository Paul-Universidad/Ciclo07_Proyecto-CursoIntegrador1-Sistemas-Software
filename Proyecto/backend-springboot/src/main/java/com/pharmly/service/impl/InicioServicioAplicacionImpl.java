package com.pharmly.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.MedicamentosDao;
import com.pharmly.dao.interfaces.PreguntasAprendizajeDao;
import com.pharmly.dto.response.ResumenInicioRespuesta;
import com.pharmly.service.interfaces.InicioServicioAplicacion;

@Service
public class InicioServicioAplicacionImpl implements InicioServicioAplicacion {

    private final MedicamentosDao medicamentosDao;
    private final PreguntasAprendizajeDao preguntasAprendizajeDao;

    public InicioServicioAplicacionImpl(MedicamentosDao medicamentosDao, PreguntasAprendizajeDao preguntasAprendizajeDao) {
        this.medicamentosDao = medicamentosDao;
        this.preguntasAprendizajeDao = preguntasAprendizajeDao;
    }

    @Override
    @Transactional(readOnly = true)
    public ResumenInicioRespuesta summary() {
        long medCount = medicamentosDao.count();
        long quizCount = preguntasAprendizajeDao.count();
        return new ResumenInicioRespuesta(
                "PHARMLY",
                (int) medCount,
                (int) quizCount,
                "Datos en tablas medicamento, pregunta_aprendizaje y opcion_aprendizaje (H2: schema.sql / data.sql). Consola: /h2-console"
        );
    }
}
