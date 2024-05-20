package io.omegi.core.note.presentation.model.response;

import java.util.List;

public record DrawCommentsViewResponse(
	List<CommentResponse> comments
) {
	public record CommentResponse(
		Integer commentId,
		String content,
		WriterResponse writer
	) {
	}

	public record WriterResponse(
		Integer userId,
		String username,
		String profileImageUrl
	) {
	}
}
