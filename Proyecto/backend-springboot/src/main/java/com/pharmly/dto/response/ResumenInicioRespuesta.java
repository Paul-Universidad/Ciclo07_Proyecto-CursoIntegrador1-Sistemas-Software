package com.pharmly.dto.response;

/**
 * Resumen para la portada / panel (JSON compatible con el cliente actual).
 */
public class ResumenInicioRespuesta {

    private final String title;
    private final int medicationCount;
    private final int quizQuestionCount;
    private final String hint;

    public ResumenInicioRespuesta(String title, int medicationCount, int quizQuestionCount, String hint) {
        this.title = title;
        this.medicationCount = medicationCount;
        this.quizQuestionCount = quizQuestionCount;
        this.hint = hint;
    }

    public String getTitle() {
        return title;
    }

    public int getMedicationCount() {
        return medicationCount;
    }

    public int getQuizQuestionCount() {
        return quizQuestionCount;
    }

    public String getHint() {
        return hint;
    }
}
