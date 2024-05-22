package io.omegi.core.project.presentation.model.response;

import java.time.LocalDateTime;

public record DrawErrorSummaryViewResponse(
	Integer solvedErrorCount,
	Integer unsolvedErrorCount,
	LocalDateTime recentlyErrorOccurredAt
) {
}
