package io.omegi.core.note.persistence;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.note.domain.Comment;
import io.omegi.core.note.domain.Note;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

	Slice<Comment> findCommentsByNote(Pageable pageable, Note note);

	List<Comment> findAllByNoteOrderByCreatedAtAsc(Note note);
}
