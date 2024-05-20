package io.omegi.core.note.presentation.model.response;

import java.util.List;

import lombok.Builder;

public record DrawMyNoteGraphViewResponse(
	List<NodeResponse> nodes,
	List<EdgeResponse> edges
) {
	@Builder
	public record NodeResponse(
		Integer nodeId,
		Integer index,
		String value,
		String type
	) {
	}

	@Builder
	public record EdgeResponse(
		Integer sourceIndex,
		Integer targetIndex
	) {
	}
}
