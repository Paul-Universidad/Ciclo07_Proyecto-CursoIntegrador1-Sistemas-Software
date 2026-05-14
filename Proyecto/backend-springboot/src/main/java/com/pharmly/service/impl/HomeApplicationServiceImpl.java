package com.pharmly.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.MedicationDAO;
import com.pharmly.dao.interfaces.QuizQuestionDAO;
import com.pharmly.dto.response.HomeSummaryResponse;
import com.pharmly.service.interfaces.HomeApplicationService;

@Service
public class HomeApplicationServiceImpl implements HomeApplicationService {

    private final MedicationDAO medicationDAO;
    private final QuizQuestionDAO quizQuestionDAO;

    public HomeApplicationServiceImpl(MedicationDAO medicationDAO, QuizQuestionDAO quizQuestionDAO) {
        this.medicationDAO = medicationDAO;
        this.quizQuestionDAO = quizQuestionDAO;
    }

    @Override
    @Transactional(readOnly = true)
    public HomeSummaryResponse summary() {
        long medCount = medicationDAO.count();
        long quizCount = quizQuestionDAO.count();
        return new HomeSummaryResponse(
                "PHARMLY",
                (int) medCount,
                (int) quizCount,
                "Datos cargados desde H2 (schema.sql / data.sql). Consola H2: /h2-console"
        );
    }
}
