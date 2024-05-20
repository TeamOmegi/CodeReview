package io.omegi.core.note.application.dto.request;

import java.util.List;

public record UpdateTagsRequestDto(
	Integer userId,
	Integer noteId,
	List<String> tagNames
) {
}
