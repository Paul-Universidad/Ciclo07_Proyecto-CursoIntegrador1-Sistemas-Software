package com.pharmly.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.request.QuizAnswerRequest;
import com.pharmly.dto.response.QuizAnswerResponse;
import com.pharmly.dto.response.QuizQuestionResponse;
import com.pharmly.service.interfaces.QuizService;

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
