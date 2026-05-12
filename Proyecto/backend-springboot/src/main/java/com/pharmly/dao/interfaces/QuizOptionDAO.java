package com.pharmly.dao.interfaces;

import java.util.Optional;

import com.pharmly.model.QuizOptionEntity;

public interface QuizOptionDAO {

    Optional<QuizOptionEntity> findById(Long id);
}
