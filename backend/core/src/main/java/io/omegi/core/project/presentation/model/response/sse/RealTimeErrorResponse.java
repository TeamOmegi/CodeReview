package io.omegi.core.project.presentation.model.response.sse;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record RealTimeErrorResponse(
	Integer errorId,
	Integer serviceId,
	Integer projectId,
	String serviceName,
	String projectName,
	boolean solved,
	String type,
	LocalDateTime time
) {
}
