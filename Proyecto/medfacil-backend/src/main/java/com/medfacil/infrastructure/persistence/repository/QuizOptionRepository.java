package com.medfacil.infrastructure.persistence.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.medfacil.application.dao.QuizOptionDAO;
import com.medfacil.infrastructure.persistence.entity.QuizOptionEntity;

@Repository
public class QuizOptionRepository implements QuizOptionDAO {

    private final QuizOptionJpaRepository quizOptionJpaRepository;

    public QuizOptionRepository(QuizOptionJpaRepository quizOptionJpaRepository) {
        this.quizOptionJpaRepository = quizOptionJpaRepository;
    }

    @Override
    public Optional<QuizOptionEntity> findById(Long id) {
        return quizOptionJpaRepository.findById(id);
    }
}
