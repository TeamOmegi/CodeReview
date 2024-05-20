package io.omegi.core.note.presentation.model.request;

import jakarta.validation.constraints.Positive;

public record LinkNoteRequest(
	@Positive Integer noteId,
	@Positive Integer targetNoteId
) {
}
