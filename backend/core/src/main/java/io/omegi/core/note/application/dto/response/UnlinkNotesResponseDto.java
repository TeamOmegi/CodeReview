package io.omegi.core.note.application.dto.response;

import java.util.List;

public record UnlinkNotesResponseDto(
	Integer noteId,
	List<Integer> unlinkedNoteIds
) {
}
