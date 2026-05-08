package com.medfacil.api.dto;

import jakarta.validation.constraints.NotBlank;

public record AdviceRequest(
        @NotBlank String topic
) {
}
