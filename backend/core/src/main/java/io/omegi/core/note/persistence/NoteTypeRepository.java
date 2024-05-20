package io.omegi.core.note.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.note.domain.NoteType;
import io.omegi.core.note.domain.Type;

public interface NoteTypeRepository extends JpaRepository<NoteType, Integer> {

	Optional<NoteType> findByType(Type type);
}
