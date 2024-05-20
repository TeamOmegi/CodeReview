package io.omegi.core.note.application.dto.request;

public record DeleteNoteRequestDto(
	Integer userId,
	Integer noteId
) {
}
