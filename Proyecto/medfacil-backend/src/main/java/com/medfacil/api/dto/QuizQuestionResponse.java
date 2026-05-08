package com.medfacil.api.dto;

import java.util.List;

public class QuizQuestionResponse {

    private final Long id;
    private final String prompt;
    private final List<QuizOptionResponse> options;

    public QuizQuestionResponse(Long id, String prompt, List<QuizOptionResponse> options) {
        this.id = id;
        this.prompt = prompt;
        this.options = options;
    }

    public Long getId() {
        return id;
    }

    public String getPrompt() {
        return prompt;
    }

    public List<QuizOptionResponse> getOptions() {
        return options;
    }
}
