package io.omegi.core.project.presentation.model.response;

import java.util.List;

import lombok.Builder;

public record DrawProjectDetailViewResponse(
	Integer projectId,
	String projectName,
	List<ServiceResponse> services
) {
	@Builder
	public record ServiceResponse(
		Integer serviceId,
		String serviceName
	) {
	}
}
