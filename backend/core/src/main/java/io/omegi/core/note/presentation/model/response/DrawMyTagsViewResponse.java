package io.omegi.core.note.presentation.model.response;

import java.util.List;

public record DrawMyTagsViewResponse(
	List<String> tags
) {
}
