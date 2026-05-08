package com.medfacil.infrastructure.persistence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.medfacil.application.dao.QuizQuestionDAO;
import com.medfacil.infrastructure.persistence.entity.QuizQuestionEntity;

@Repository
public class QuizQuestionRepository implements QuizQuestionDAO {

    private final QuizQuestionJpaRepository quizQuestionJpaRepository;

    public QuizQuestionRepository(QuizQuestionJpaRepository quizQuestionJpaRepository) {
        this.quizQuestionJpaRepository = quizQuestionJpaRepository;
    }

    @Override
    public List<QuizQuestionEntity> findAllWithOptions() {
        return quizQuestionJpaRepository.findAllWithOptions();
    }

    @Override
    public Optional<QuizQuestionEntity> findById(Long id) {
        return quizQuestionJpaRepository.findById(id);
    }

    @Override
    public long count() {
        return quizQuestionJpaRepository.count();
    }
}
