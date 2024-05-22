package io.omegi.core.project.presentation.model.response;

import java.util.List;

public record CreateProjectResponse(
	Integer projectId,
	List<Integer> serviceIds
	) {
}
