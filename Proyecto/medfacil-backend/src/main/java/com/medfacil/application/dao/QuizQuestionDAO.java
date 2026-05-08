package com.medfacil.application.dao;

import java.util.List;
import java.util.Optional;

import com.medfacil.infrastructure.persistence.entity.QuizQuestionEntity;

public interface QuizQuestionDAO {

    List<QuizQuestionEntity> findAllWithOptions();

    Optional<QuizQuestionEntity> findById(Long id);

    long count();
}
