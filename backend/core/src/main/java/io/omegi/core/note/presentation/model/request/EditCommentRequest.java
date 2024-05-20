package io.omegi.core.note.presentation.model.request;

import jakarta.validation.constraints.NotBlank;

public record EditCommentRequest(
	@NotBlank String content
) {
}
