package io.omegi.core.note.persistence;

import java.util.List;

import io.omegi.core.note.domain.Note;
import io.omegi.core.user.domain.User;

public interface CustomNoteRepository {

	List<Note> searchMyNotes(User user, String keyword, String tagName);

	List<Note> searchAllNotes(User user, String keyword);
}
