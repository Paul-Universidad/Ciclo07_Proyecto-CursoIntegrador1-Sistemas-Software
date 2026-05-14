package com.pharmly.dto.request;

import jakarta.validation.constraints.NotNull;

public record QuizAnswerRequest(
        @NotNull Long questionId,
        @NotNull Long optionId
) {
}
