package com.pharmly.dto.request;

import jakarta.validation.constraints.NotNull;

public record SolicitudRespuestaPregunta(
        @NotNull Long questionId,
        @NotNull Long optionId
) {
}
