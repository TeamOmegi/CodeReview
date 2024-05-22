package io.omegi.core.project.presentation.model.response;

import java.util.List;

import lombok.Builder;

public record DrawProjectsViewResponse(
	List<ProjectResponse> projects
) {
	@Builder
	public record ProjectResponse(
		Integer projectId,
		String name
	) {
	}
}
