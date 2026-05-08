package com.medfacil.api.dto;

import jakarta.validation.constraints.NotNull;

public record QuizAnswerRequest(
        @NotNull Long questionId,
        @NotNull Long optionId
) {
}
