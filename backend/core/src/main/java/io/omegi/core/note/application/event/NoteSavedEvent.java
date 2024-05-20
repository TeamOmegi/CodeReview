package io.omegi.core.note.application.event;

import java.util.List;

public record NoteSavedEvent(
	Integer userId,
	Integer noteId,
	List<String> tagNames,
	List<Integer> targetNoteIds
) {
}
