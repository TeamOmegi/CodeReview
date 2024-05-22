package io.omegi.core.project.presentation.model.request;

import jakarta.validation.constraints.NotBlank;

public record CreateServiceTokenRequest(
        @NotBlank String name
) {
}
