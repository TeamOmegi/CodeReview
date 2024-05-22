package io.omegi.core.project.application.dto.response;

import java.util.List;

public record CreateProjectResponseDto(
	Integer projectId,
	List<Integer> serviceIds
) {
}
