package io.omegi.core.project.application.dto.request;

public record MarkErrorSolvedRequestDto(
	Integer userId,
	Integer errorId
) {
}
