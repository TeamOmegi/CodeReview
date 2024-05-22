package io.omegi.core.note.presentation.model.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

@Builder
public record DrawMyNoteDetailViewResponse(
	Integer noteId,
	String title,
	String content,
	List<String> tags,
	String type,
	String visibility,
	Integer backlinkCount,
	LocalDateTime createdAt,
	RelatedErrorResponse error
) {
	@Builder
	public record RelatedErrorResponse(
		Integer errorId,
		String errorType,
		String summary,
		boolean solved
		) {
	}
}