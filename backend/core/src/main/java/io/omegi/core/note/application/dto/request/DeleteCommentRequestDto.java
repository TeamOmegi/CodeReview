package io.omegi.core.note.application.dto.request;

public record DeleteCommentRequestDto(
	Integer userId,
	Integer noteId,
	Integer commentId
) {
}
