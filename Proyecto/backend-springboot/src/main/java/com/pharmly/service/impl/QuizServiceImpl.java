package com.pharmly.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmly.dao.interfaces.QuizOptionDAO;
import com.pharmly.dao.interfaces.QuizQuestionDAO;
import com.pharmly.dto.request.QuizAnswerRequest;
import com.pharmly.dto.response.QuizAnswerResponse;
import com.pharmly.dto.response.QuizOptionResponse;
import com.pharmly.dto.response.QuizQuestionResponse;
import com.pharmly.exception.ResourceNotFoundException;
import com.pharmly.model.QuizOptionEntity;
import com.pharmly.model.QuizQuestionEntity;
import com.pharmly.service.interfaces.QuizService;

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
