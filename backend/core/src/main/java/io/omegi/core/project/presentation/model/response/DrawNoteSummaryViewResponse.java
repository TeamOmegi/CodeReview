package io.omegi.core.project.presentation.model.response;

public record DrawNoteSummaryViewResponse(
	Integer noteCount,
	Integer linkCount,
	Integer backlinkCount
) {
}
