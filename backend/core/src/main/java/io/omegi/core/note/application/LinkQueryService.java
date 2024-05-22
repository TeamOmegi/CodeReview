package io.omegi.core.note.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.note.application.dto.request.DrawIsLinkedViewRequestDto;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.persistence.LinkRepository;
import io.omegi.core.note.persistence.NoteRepository;
import io.omegi.core.note.presentation.model.response.DrawIsLinkedViewResponse;
import io.omegi.core.user.domain.User;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LinkQueryService {

	private final LinkRepository linkRepository;
	private final NoteRepository noteRepository;

	public DrawIsLinkedViewResponse isLinked(DrawIsLinkedViewRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(RuntimeException::new);

		User user = note.getUser();
		if (!user.getUserId().equals(requestDto.userId())) {
			throw new AccessDeniedException();
		}

		Note targetNote = noteRepository.findById(requestDto.targetNoteId())
			.orElseThrow(RuntimeException::new);

		boolean linked = linkRepository.existsByNoteAndLinkedNote(note, targetNote);

		return new DrawIsLinkedViewResponse(linked);
	}
}
