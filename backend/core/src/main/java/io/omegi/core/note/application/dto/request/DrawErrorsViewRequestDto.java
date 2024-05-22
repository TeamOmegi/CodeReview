package io.omegi.core.note.application.dto.request;

public record DrawErrorsViewRequestDto(
	Integer userId,
	String projectName,
	String serviceName,
	Boolean solved,
	String errorType
) {
}
