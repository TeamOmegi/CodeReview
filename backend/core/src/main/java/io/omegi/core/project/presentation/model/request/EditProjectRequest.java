package io.omegi.core.project.presentation.model.request;

import jakarta.validation.constraints.NotBlank;

public record EditProjectRequest(
	@NotBlank String name
) {
}
