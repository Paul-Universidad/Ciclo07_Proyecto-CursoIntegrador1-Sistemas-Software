package com.medfacil.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medfacil.api.dto.QuizAnswerRequest;
import com.medfacil.api.dto.QuizAnswerResponse;
import com.medfacil.api.dto.QuizQuestionResponse;
import com.medfacil.application.service.QuizService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/questions")
    public List<QuizQuestionResponse> questions() {
        return quizService.listQuestions();
    }

    @PostMapping("/answer")
    public QuizAnswerResponse answer(@Valid @RequestBody QuizAnswerRequest request) {
        return quizService.evaluate(request);
    }
}
