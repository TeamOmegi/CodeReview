package io.omegi.core.note.application.dto.request;

import java.util.List;

import lombok.Builder;

@Builder
public record SaveNoteRequestDto(
	Integer userId,
	String title,
	String content,
	List<String> tagNames,
	String type,
	String visibility,
	List<Integer> targetNoteIds
) {
}
