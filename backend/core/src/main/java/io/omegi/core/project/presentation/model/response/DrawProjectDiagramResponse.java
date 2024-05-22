package io.omegi.core.project.presentation.model.response;

import java.util.List;

import lombok.Builder;

public record DrawProjectDiagramResponse(
	List<NodeResponse> nodes,
	List<EdgeResponse> edges
) {
	@Builder
	public record NodeResponse(
		Integer serviceId,
		String serviceName,
		String serviceImageUrl
	) {
	}

	@Builder
	public record EdgeResponse(
		Integer source,
		Integer target
	) {
	}
}
