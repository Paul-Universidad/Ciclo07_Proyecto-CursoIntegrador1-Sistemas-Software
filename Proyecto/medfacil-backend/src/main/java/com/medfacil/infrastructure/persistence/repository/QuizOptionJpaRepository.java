package com.medfacil.infrastructure.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medfacil.infrastructure.persistence.entity.QuizOptionEntity;

public interface QuizOptionJpaRepository extends JpaRepository<QuizOptionEntity, Long> {
}
