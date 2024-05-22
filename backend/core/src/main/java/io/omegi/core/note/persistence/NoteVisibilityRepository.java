package io.omegi.core.note.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.note.domain.NoteVisibility;
import io.omegi.core.note.domain.Visibility;

public interface NoteVisibilityRepository extends JpaRepository<NoteVisibility, Integer> {

	Optional<NoteVisibility> findByVisibility(Visibility visibility);
}
