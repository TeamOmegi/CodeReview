package io.omegi.core.project.presentation.model.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import lombok.Builder;

@Builder
public record DrawErrorDetailViewResponse(
	String type,
	String summary,
	String log,
	List<TraceResponse> trace,
	LocalDateTime time,
	Integer projectId,
	Integer serviceId,
	Integer noteId
) {
	@Builder
	public record TraceResponse(
		String spanId,
		String parentSpanId,
		String serviceName,
		String name,
		String kind,
		Map<String, Object> attributes,
		LocalDateTime enterTime,
		LocalDateTime exitTime
	) {
	}
}
