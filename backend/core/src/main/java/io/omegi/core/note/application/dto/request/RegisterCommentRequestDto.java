package io.omegi.core.note.application.dto.request;

public record RegisterCommentRequestDto(
	Integer userId,
	Integer noteId,
	String content
) {
}
