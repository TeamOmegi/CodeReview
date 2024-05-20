package io.omegi.core.project.application.dto.request;

public record EditProjectRequestDto(
	Integer userId,
	Integer projectId,
	String name
) {
}
