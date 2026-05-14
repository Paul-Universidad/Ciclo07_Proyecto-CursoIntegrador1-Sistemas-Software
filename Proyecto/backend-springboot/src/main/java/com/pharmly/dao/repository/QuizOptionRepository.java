package com.pharmly.dao.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.pharmly.dao.interfaces.QuizOptionDAO;
import com.pharmly.model.QuizOptionEntity;

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
