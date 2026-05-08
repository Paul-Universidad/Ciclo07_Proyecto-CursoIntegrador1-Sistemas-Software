package com.medfacil.application.service;

import java.util.List;

import com.medfacil.api.dto.QuizAnswerRequest;
import com.medfacil.api.dto.QuizAnswerResponse;
import com.medfacil.api.dto.QuizQuestionResponse;

public interface QuizService {

    List<QuizQuestionResponse> listQuestions();

    QuizAnswerResponse evaluate(QuizAnswerRequest request);
}
