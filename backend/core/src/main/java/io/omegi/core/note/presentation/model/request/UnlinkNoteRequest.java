package io.omegi.core.note.presentation.model.request;

import jakarta.validation.constraints.Positive;

public record UnlinkNoteRequest(
	@Positive Integer noteId,
	@Positive Integer targetNoteId
) {
}
