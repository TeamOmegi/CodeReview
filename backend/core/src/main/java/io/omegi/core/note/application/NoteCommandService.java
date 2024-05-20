package io.omegi.core.note.application;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.note.application.dto.request.DeleteNoteRequestDto;
import io.omegi.core.note.application.dto.request.EditNoteRequestDto;
import io.omegi.core.note.application.dto.request.SaveNoteRequestDto;
import io.omegi.core.note.application.dto.response.DeleteNoteResponseDto;
import io.omegi.core.note.application.dto.response.EditNoteResponseDto;
import io.omegi.core.note.application.dto.response.SaveNoteResponseDto;
import io.omegi.core.note.application.event.NoteEditedEvent;
import io.omegi.core.note.application.event.NoteSavedEvent;
import io.omegi.core.note.application.exception.NoteAccessDeniedException;
import io.omegi.core.note.application.exception.NoteNotFoundException;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.domain.NoteType;
import io.omegi.core.note.domain.NoteVisibility;
import io.omegi.core.note.domain.Type;
import io.omegi.core.note.domain.Visibility;
import io.omegi.core.note.persistence.NoteRepository;
import io.omegi.core.note.persistence.NoteTypeRepository;
import io.omegi.core.note.persistence.NoteVisibilityRepository;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NoteCommandService {

	private final NoteRepository noteRepository;
	private final NoteTypeRepository noteTypeRepository;
	private final NoteVisibilityRepository noteVisibilityRepository;
	private final UserRepository userRepository;

	private final ApplicationEventPublisher eventPublisher;

	public SaveNoteResponseDto saveNote(SaveNoteRequestDto requestDto) {
		NoteType noteType = noteTypeRepository.findByType(Type.valueOf(requestDto.type()))
			.orElseThrow(RuntimeException::new);
		NoteVisibility noteVisibility = noteVisibilityRepository.findByVisibility(Visibility.valueOf(requestDto.visibility()))
			.orElseThrow(RuntimeException::new);

		User user = userRepository.findById(requestDto.userId())
			.orElseThrow(RuntimeException::new);

		Note note = Note.builder()
			.user(user)
			.title(requestDto.title())
			.content(requestDto.content())
			.noteType(noteType)
			.noteVisibility(noteVisibility)
			.build();

		noteRepository.save(note);

		eventPublisher.publishEvent(new NoteSavedEvent(requestDto.userId(), note.getNoteId(), requestDto.tagNames(), requestDto.targetNoteIds()));

		return new SaveNoteResponseDto(note.getNoteId());
	}

	public EditNoteResponseDto editNote(EditNoteRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(NoteNotFoundException::new);

		User user = note.getUser();
		if (!user.getUserId().equals(requestDto.userId())) {
			throw new AccessDeniedException();
		}

		NoteType noteType = noteTypeRepository.findByType(Type.valueOf(requestDto.noteType()))
			.orElseThrow(RuntimeException::new);
		NoteVisibility noteVisibility = noteVisibilityRepository.findByVisibility(Visibility.valueOf(requestDto.noteVisibility()))
			.orElseThrow(RuntimeException::new);

		note.edit(requestDto.title(), requestDto.content(), noteType, noteVisibility);


		eventPublisher.publishEvent(new NoteEditedEvent(requestDto.userId(), requestDto.noteId(), requestDto.tagNames(), requestDto.linkedNoteIds()));

		return new EditNoteResponseDto(note.getNoteId());
	}

	public DeleteNoteResponseDto deleteNote(DeleteNoteRequestDto requestDto) {
		User user = userRepository.findById(requestDto.userId())
			.orElseThrow(RuntimeException::new);

		if (!noteRepository.existsByNoteIdAndUser(requestDto.noteId(), user)) { // todo: null -> user
			throw new NoteAccessDeniedException();
		}

		noteRepository.deleteById(requestDto.noteId());

		return new DeleteNoteResponseDto(requestDto.noteId());
	}
}
