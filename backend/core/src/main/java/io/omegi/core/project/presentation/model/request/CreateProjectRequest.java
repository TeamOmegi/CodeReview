package io.omegi.core.project.presentation.model.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateProjectRequest(
	@NotBlank String projectName,
	@NotNull List<ServiceRequest> services
) {
	public record ServiceRequest(
		@NotBlank String serviceName,
		@Positive Integer serviceTypeId
	) {
	}
}
