package io.omegi.core.note.presentation.model.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

@Builder
public record DrawAllNoteDetailViewResponse(
	Integer noteId,
	String title,
	String content,
	List<String> tags,
	String type,
	String visibility,
	Integer backlinkCount,
	LocalDateTime createdAt,
	RelatedErrorResponse error,
	UserResponse user
) {
	@Builder
	public record RelatedErrorResponse(
		Integer errorId,
		String errorType,
		String summary,
		boolean solved
	) {
	}

	@Builder
	public record UserResponse(
		Integer userId,
		String username,
		String profileImageUrl
	) {
	}
}
