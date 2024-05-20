package io.omegi.core.note.presentation.model.response;

public record LinkNoteResponse(
	Integer noteId,
	Integer linkedNoteId
) {
}
