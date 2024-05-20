package io.omegi.core.note.application.dto.request;

public record EditCommentRequestDto(
	Integer userId,
	Integer noteId,
	Integer commentId,
	String content
) {
}
