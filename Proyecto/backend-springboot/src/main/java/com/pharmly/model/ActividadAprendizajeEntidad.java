package com.pharmly.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/** Una partida jugada en un minijuego del módulo de aprendizaje. */
@Entity
@Table(name = "actividad_aprendizaje")
public class ActividadAprendizajeEntidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long userId;

    /** QUIZ | COMPLETAR | CASOS */
    @Column(name = "juego", nullable = false, length = 20)
    private String game;

    @Column(name = "total", nullable = false)
    private int total;

    @Column(name = "aciertos", nullable = false)
    private int correct;

    @Column(name = "fecha")
    private LocalDateTime date;

    @PrePersist
    void prePersist() {
        if (date == null) {
            date = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getGame() {
        return game;
    }

    public void setGame(String game) {
        this.game = game;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

    public LocalDateTime getDate() {
        return date;
    }
}
