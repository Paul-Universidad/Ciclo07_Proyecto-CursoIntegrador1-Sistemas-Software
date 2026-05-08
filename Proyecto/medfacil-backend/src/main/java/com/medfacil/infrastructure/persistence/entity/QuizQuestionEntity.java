package com.medfacil.infrastructure.persistence.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

@Entity
@Table(name = "quiz_question")
public class QuizQuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2000)
    private String prompt;

    @Column(length = 4000)
    private String explanation;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = false)
    @OrderBy("id ASC")
    private List<QuizOptionEntity> options = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getPrompt() {
        return prompt;
    }

    public String getExplanation() {
        return explanation;
    }

    public List<QuizOptionEntity> getOptions() {
        return options;
    }
}
