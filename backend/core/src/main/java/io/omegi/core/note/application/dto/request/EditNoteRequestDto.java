package io.omegi.core.note.application.dto.request;

import java.util.List;

import lombok.Builder;

@Builder
public record EditNoteRequestDto(
	Integer userId,
	Integer noteId,
	String title,
	String content,
	List<String> tagNames,
	String noteType,
	String noteVisibility,
	List<Integer> linkedNoteIds
) {
}
