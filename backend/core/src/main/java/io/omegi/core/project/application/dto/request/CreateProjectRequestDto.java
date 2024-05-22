package io.omegi.core.project.application.dto.request;

import java.util.List;

public record CreateProjectRequestDto(
	Integer userId,
	String projectName,
	List<ServiceRequestDto> services
) {
	public record ServiceRequestDto(
		Integer serviceTypeId,
		String serviceName
	) {
	}
}
