package com.pharmly.dto.request;

import jakarta.validation.constraints.NotBlank;

public record AdviceRequest(
        @NotBlank String topic
) {
}
