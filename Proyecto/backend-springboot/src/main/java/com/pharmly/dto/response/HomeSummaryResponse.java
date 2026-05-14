package com.pharmly.dto.response;

/**
 * JavaBean (getters) para compatibilidad con JSP/EL; JSON sigue igual con Jackson.
 */
public class HomeSummaryResponse {

    private final String title;
    private final int medicationCount;
    private final int quizQuestionCount;
    private final String hint;

    public HomeSummaryResponse(String title, int medicationCount, int quizQuestionCount, String hint) {
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
