package io.omegi.core.project.application.dto.request;

public record DeleteProjectRequestDto(
	Integer userId,
	Integer projectId
) {
}
