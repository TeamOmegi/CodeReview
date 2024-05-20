package io.omegi.core.project.presentation.model.response;

import lombok.Builder;

@Builder
public record DrawErrorDetailViewResponse(
	String summary,
	String log,
	Integer noteId
) {
}
