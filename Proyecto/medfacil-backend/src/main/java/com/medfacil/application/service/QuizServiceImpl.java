package com.medfacil.application.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medfacil.api.dto.QuizAnswerRequest;
import com.medfacil.api.dto.QuizAnswerResponse;
import com.medfacil.api.dto.QuizOptionResponse;
import com.medfacil.api.dto.QuizQuestionResponse;
import com.medfacil.application.dao.QuizOptionDAO;
import com.medfacil.application.dao.QuizQuestionDAO;
import com.medfacil.infrastructure.persistence.entity.QuizOptionEntity;
import com.medfacil.infrastructure.persistence.entity.QuizQuestionEntity;
import com.medfacil.shared.exception.ResourceNotFoundException;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizQuestionDAO quizQuestionDAO;
    private final QuizOptionDAO quizOptionDAO;

    public QuizServiceImpl(QuizQuestionDAO quizQuestionDAO, QuizOptionDAO quizOptionDAO) {
        this.quizQuestionDAO = quizQuestionDAO;
        this.quizOptionDAO = quizOptionDAO;
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuizQuestionResponse> listQuestions() {
        return quizQuestionDAO.findAllWithOptions().stream()
                .map(QuizServiceImpl::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public QuizAnswerResponse evaluate(QuizAnswerRequest request) {
        QuizQuestionEntity question = quizQuestionDAO.findById(request.questionId())
                .orElseThrow(() -> new ResourceNotFoundException("Pregunta no encontrada: " + request.questionId()));
        QuizOptionEntity option = quizOptionDAO.findById(request.optionId())
                .orElseThrow(() -> new ResourceNotFoundException("Opción no encontrada: " + request.optionId()));
        if (!option.getQuestion().getId().equals(question.getId())) {
            throw new IllegalArgumentException("La opción no pertenece a esa pregunta");
        }
        return new QuizAnswerResponse(option.isCorrect(), question.getExplanation());
    }

    private static QuizQuestionResponse toResponse(QuizQuestionEntity q) {
        List<QuizOptionResponse> options = q.getOptions().stream()
                .map(o -> new QuizOptionResponse(o.getId(), o.getText()))
                .toList();
        return new QuizQuestionResponse(q.getId(), q.getPrompt(), options);
    }
}
