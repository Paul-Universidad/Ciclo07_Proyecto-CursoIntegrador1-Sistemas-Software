package com.pharmly.dao.interfaces;

import java.util.List;
import java.util.Optional;

import com.pharmly.model.QuizQuestionEntity;

public interface QuizQuestionDAO {

    List<QuizQuestionEntity> findAllWithOptions();

    Optional<QuizQuestionEntity> findById(Long id);

    long count();
}
