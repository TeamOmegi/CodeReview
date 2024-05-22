package io.omegi.core.note.application.dto.request;

public record DrawIsLinkedViewRequestDto(
	Integer userId,
	Integer noteId,
	Integer targetNoteId
) {
}
