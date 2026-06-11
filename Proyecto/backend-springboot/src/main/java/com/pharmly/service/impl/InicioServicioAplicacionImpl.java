package com.pharmly.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.CasosClinicosDao;
import com.pharmly.dao.interfaces.DolenciasDao;
import com.pharmly.dao.interfaces.MedicamentosDao;
import com.pharmly.dao.interfaces.PreguntasAprendizajeDao;
import com.pharmly.dto.response.ResumenInicioRespuesta;
import com.pharmly.service.interfaces.InicioServicioAplicacion;

@Service
public class InicioServicioAplicacionImpl implements InicioServicioAplicacion {

    private final MedicamentosDao medicamentosDao;
    private final PreguntasAprendizajeDao preguntasAprendizajeDao;
    private final DolenciasDao dolenciasDao;
    private final CasosClinicosDao casosClinicosDao;

    public InicioServicioAplicacionImpl(MedicamentosDao medicamentosDao,
            PreguntasAprendizajeDao preguntasAprendizajeDao,
            DolenciasDao dolenciasDao,
            CasosClinicosDao casosClinicosDao) {
        this.medicamentosDao = medicamentosDao;
        this.preguntasAprendizajeDao = preguntasAprendizajeDao;
        this.dolenciasDao = dolenciasDao;
        this.casosClinicosDao = casosClinicosDao;
    }

    @Override
    @Transactional(readOnly = true)
    public ResumenInicioRespuesta summary() {
        return new ResumenInicioRespuesta(
                "PHARMLY",
                (int) medicamentosDao.count(),
                (int) preguntasAprendizajeDao.count(),
                (int) dolenciasDao.count(),
                (int) casosClinicosDao.count(),
                "Datos en tablas medicamento, dolencia, pregunta_aprendizaje y caso_clinico (H2: schema.sql / data.sql). Consola: /h2-console"
        );
    }
}
