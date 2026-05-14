package com.pharmly.service.interfaces;

import java.util.List;

import com.pharmly.dto.request.QuizAnswerRequest;
import com.pharmly.dto.response.QuizAnswerResponse;
import com.pharmly.dto.response.QuizQuestionResponse;

public interface QuizService {

    List<QuizQuestionResponse> listQuestions();

    QuizAnswerResponse evaluate(QuizAnswerRequest request);
}
