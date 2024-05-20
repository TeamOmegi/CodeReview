package io.omegi.core.note.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.omegi.core.note.domain.Note;
import io.omegi.core.user.domain.User;

public interface NoteRepository extends JpaRepository<Note, Integer>, CustomNoteRepository {

	boolean existsByNoteIdAndUser(Integer noteId, User user);

	List<Note> findAllByUser(User user);

	int countByUser(@Param("user") User user);
}
