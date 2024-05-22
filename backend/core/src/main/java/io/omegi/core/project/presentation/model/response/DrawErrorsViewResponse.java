package io.omegi.core.project.presentation.model.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;

public record DrawErrorsViewResponse(
	List<ErrorResponse> errors
) {
	@Builder
	public record ErrorResponse(
		Integer errorId,
		boolean isSolved,
		String errorType,
		String project,
		String service,
		LocalDateTime time,
		int pastNoteCount
	) {
	}
}
