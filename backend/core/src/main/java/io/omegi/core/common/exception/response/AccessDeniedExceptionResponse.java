package io.omegi.core.common.exception.response;

public record AccessDeniedExceptionResponse(
	Integer accessorId,
	String message
) {
}
