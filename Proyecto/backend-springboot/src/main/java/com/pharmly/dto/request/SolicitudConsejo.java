package com.pharmly.dto.request;

import jakarta.validation.constraints.NotBlank;

public record SolicitudConsejo(
        @NotBlank String topic
) {
}
