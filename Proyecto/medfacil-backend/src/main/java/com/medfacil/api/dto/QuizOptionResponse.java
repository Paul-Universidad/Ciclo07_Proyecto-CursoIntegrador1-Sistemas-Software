package com.medfacil.api.dto;

public class QuizOptionResponse {

    private final Long id;
    private final String text;

    public QuizOptionResponse(Long id, String text) {
        this.id = id;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }
}
