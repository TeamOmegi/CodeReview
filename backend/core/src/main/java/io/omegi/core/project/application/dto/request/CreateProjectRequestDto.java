package io.omegi.core.project.application.dto.request;

public record CreateProjectRequestDto(
	Integer userId,
	String name
) {
}
