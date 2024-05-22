package io.omegi.core.note.application.dto.response;

import java.util.List;

public record LinkNotesResponseDto(
	Integer noteId,
	List<Integer> linkedNoteIds
) {
}
