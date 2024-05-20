package io.omegi.core.note.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.note.domain.NoteTag;

public interface NoteTagRepository extends JpaRepository<NoteTag, Integer> {
}
