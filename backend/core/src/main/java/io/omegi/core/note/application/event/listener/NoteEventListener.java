package io.omegi.core.note.application.event.listener;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.note.application.LinkCommandService;
import io.omegi.core.note.application.TagCommandService;
import io.omegi.core.note.application.dto.request.AttachTagsRequestDto;
import io.omegi.core.note.application.dto.request.LinkNotesRequestDto;
import io.omegi.core.note.application.dto.request.UpdateTagsRequestDto;
import io.omegi.core.note.application.event.NoteEditedEvent;
import io.omegi.core.note.application.event.NoteSavedEvent;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NoteEventListener {

	private final LinkCommandService linkCommandService;
	private final TagCommandService tagCommandService;

	@Transactional
	@EventListener
	public void linkNotes(NoteSavedEvent event) {
		LinkNotesRequestDto requestDto = new LinkNotesRequestDto(event.userId(), event.noteId(), event.targetNoteIds());
		linkCommandService.linkNotes(requestDto);
	}

	@Transactional
	@EventListener
	public void attachTags(NoteSavedEvent event) {
		AttachTagsRequestDto requestDto = new AttachTagsRequestDto(event.noteId(), event.tagNames());
		tagCommandService.attachTags(requestDto);
	}

	@Transactional
	@EventListener
	public void updateTags(NoteEditedEvent event) {
		UpdateTagsRequestDto requestDto = new UpdateTagsRequestDto(event.userId(), event.noteId(), event.tagNames());
		tagCommandService.updateTags(requestDto);
	}
}