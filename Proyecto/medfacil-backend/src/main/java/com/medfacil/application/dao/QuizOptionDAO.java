package com.medfacil.application.dao;

import java.util.Optional;

import com.medfacil.infrastructure.persistence.entity.QuizOptionEntity;

public interface QuizOptionDAO {

    Optional<QuizOptionEntity> findById(Long id);
}
