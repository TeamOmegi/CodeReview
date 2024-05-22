package io.omegi.core.note.presentation.model.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record EditNoteRequest(
	@NotBlank String title,
	@NotBlank String content,
	@NotNull List<String> tags,
	@NotBlank String type,
	@NotBlank String visibility,
	@NotNull List<Integer> links
	) {
}
