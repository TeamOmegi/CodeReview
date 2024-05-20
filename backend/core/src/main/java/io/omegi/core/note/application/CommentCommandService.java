package io.omegi.core.note.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.note.application.dto.request.DeleteCommentRequestDto;
import io.omegi.core.note.application.dto.request.EditCommentRequestDto;
import io.omegi.core.note.application.dto.request.RegisterCommentRequestDto;
import io.omegi.core.note.application.dto.response.DeleteCommentResponseDto;
import io.omegi.core.note.application.dto.response.EditCommentResponseDto;
import io.omegi.core.note.application.dto.response.RegisterCommentResponseDto;
import io.omegi.core.note.domain.Comment;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.persistence.CommentRepository;
import io.omegi.core.note.persistence.NoteRepository;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentCommandService {

	private final CommentRepository commentRepository;
	private final UserRepository userRepository;
	private final NoteRepository noteRepository;

	public RegisterCommentResponseDto registerComment(RegisterCommentRequestDto requestDto) {
		User user = userRepository.findById(requestDto.userId())
			.orElseThrow(RuntimeException::new); // todo

		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(RuntimeException::new); // todo

		Comment comment = Comment.builder()
			.user(user)
			.note(note)
			.content(requestDto.content())
			.build();

		commentRepository.save(comment);

		return new RegisterCommentResponseDto(comment.getCommentId());
	}

	public EditCommentResponseDto editComment(EditCommentRequestDto requestDto) {
		Comment comment = commentRepository.findById(requestDto.commentId())
			.orElseThrow(RuntimeException::new); // todo

		User user = comment.getUser();
		Note note = comment.getNote();

		if (!user.getUserId().equals(requestDto.userId()) || !note.getNoteId().equals(requestDto.noteId())) {
			throw new RuntimeException(); // todo
		}

		comment.editContent(requestDto.content());

		return new EditCommentResponseDto(comment.getCommentId());
	}

	public DeleteCommentResponseDto deleteComment(DeleteCommentRequestDto requestDto) {
		Comment comment = commentRepository.findById(requestDto.commentId())
			.orElseThrow(RuntimeException::new); // todo

		User user = comment.getUser();
		Note note = comment.getNote();

		if (!user.getUserId().equals(requestDto.userId()) || !note.getNoteId().equals(requestDto.noteId())) {
			throw new RuntimeException(); // todo
		}

		commentRepository.delete(comment);

		return new DeleteCommentResponseDto(comment.getCommentId());
	}
}
