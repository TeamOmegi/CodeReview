package io.omegi.core.note.presentation.model.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

public record DrawAllNoteListViewResponse(
	List<NoteResponse> notes
) {
	@Builder
	public record NoteResponse(
		Integer noteId,
		String title,
		String content,
		LocalDateTime createdAt,
		boolean isMine,
		UserResponse user
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
