package io.omegi.core.note.presentation.model.response;

public record UnlinkNoteResponse(
	Integer noteId,
	Integer unlinkedNoteId
) {
}
