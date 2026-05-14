package com.pharmly.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pharmly.model.QuizOptionEntity;

public interface QuizOptionJpaRepository extends JpaRepository<QuizOptionEntity, Long> {
}
