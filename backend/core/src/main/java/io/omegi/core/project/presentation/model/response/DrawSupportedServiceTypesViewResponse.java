package io.omegi.core.project.presentation.model.response;

import java.util.List;

import lombok.Builder;

public record DrawSupportedServiceTypesViewResponse(
	List<SupportedTypeResponse> supportedTypes
) {
	@Builder
	public record SupportedTypeResponse(
		Integer serviceTypeId,
		String serviceTypeName
	) {
	}
}
