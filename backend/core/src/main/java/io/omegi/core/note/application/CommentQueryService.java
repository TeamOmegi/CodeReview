package io.omegi.core.note.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.note.domain.Comment;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.persistence.CommentRepository;
import io.omegi.core.note.persistence.NoteRepository;
import io.omegi.core.note.presentation.model.response.DrawCommentsViewResponse;
import io.omegi.core.user.domain.User;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentQueryService {

	private final CommentRepository commentRepository;
	private final NoteRepository noteRepository;

	public DrawCommentsViewResponse drawCommentsView(Integer noteId) {
		Note note = noteRepository.findById(noteId)
			.orElseThrow(RuntimeException::new);

		if (!note.isPublic()) {
			throw new RuntimeException();
		}

		List<Comment> comments = commentRepository.findAllByNoteOrderByCreatedAtAsc(note);

		List<DrawCommentsViewResponse.CommentResponse> commentInfos = comments.stream()
			.map(comment -> {
				User user = comment.getUser();

				DrawCommentsViewResponse.WriterResponse writerResponse = new DrawCommentsViewResponse.WriterResponse(
					user.getUserId(), user.getUsername(), user.getProfileImageUrl());

				return new DrawCommentsViewResponse.CommentResponse(comment.getCommentId(), comment.getContent(),
					writerResponse);
			}).toList();

		return new DrawCommentsViewResponse(commentInfos);
	}
}

