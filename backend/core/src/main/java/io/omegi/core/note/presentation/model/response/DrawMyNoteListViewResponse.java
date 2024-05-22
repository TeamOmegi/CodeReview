package io.omegi.core.note.presentation.model.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

public record DrawMyNoteListViewResponse(
	List<NoteResponse> notes
) {
	@Builder
	public record NoteResponse(
		Integer noteId,
		String title,
		String content,
		List<String> tags,
		String type,
		String visibility,
		Integer backlinkCount,
		LocalDateTime createdAt,
		Integer errorId
	) {
	}
}
