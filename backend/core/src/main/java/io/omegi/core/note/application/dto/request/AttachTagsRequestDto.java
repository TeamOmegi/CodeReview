package io.omegi.core.note.application.dto.request;

import java.util.List;

public record AttachTagsRequestDto(
	Integer noteId,
	List<String> tagNames
) {
}
