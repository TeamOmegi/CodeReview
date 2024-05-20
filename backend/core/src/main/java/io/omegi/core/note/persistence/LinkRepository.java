package io.omegi.core.note.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.omegi.core.note.domain.Link;
import io.omegi.core.note.domain.Note;
import io.omegi.core.user.domain.User;

public interface LinkRepository extends JpaRepository<Link, Integer> {

	void deleteByNoteAndLinkedNote(Note note, Note linkedNote);


	boolean existsByNoteAndLinkedNote(Note note, Note linkedNote);

	@Query("select count(l) from Link l where l.note.user = :user and l.linkedNote.user != :user")
	int countByUserToOthers(@Param("user") User user);

	@Query("select count(l) from Link l where l.note.user != :user and l.linkedNote.user = :user")
	int countByOthersToUser(@Param("user") User user);
}
