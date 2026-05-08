package com.medfacil.infrastructure.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medfacil.infrastructure.persistence.entity.QuizQuestionEntity;

public interface QuizQuestionJpaRepository extends JpaRepository<QuizQuestionEntity, Long> {

    @Query("SELECT DISTINCT q FROM QuizQuestionEntity q LEFT JOIN FETCH q.options ORDER BY q.id ASC")
    List<QuizQuestionEntity> findAllWithOptions();
}
