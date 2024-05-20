package io.omegi.core.note.application;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.note.application.dto.request.LinkNotesRequestDto;
import io.omegi.core.note.application.dto.request.UnlinkNotesRequestDto;
import io.omegi.core.note.application.dto.response.LinkNotesResponseDto;
import io.omegi.core.note.application.dto.response.UnlinkNotesResponseDto;
import io.omegi.core.note.application.exception.LinkAlreadyExistsException;
import io.omegi.core.note.application.exception.NoteNotFoundException;
import io.omegi.core.note.domain.Link;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.persistence.LinkRepository;
import io.omegi.core.note.persistence.NoteRepository;
import io.omegi.core.user.domain.User;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LinkCommandService {

	private final LinkRepository linkRepository;
	private final NoteRepository noteRepository;

	public LinkNotesResponseDto linkNotes(LinkNotesRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(NoteNotFoundException::new);

		User user = note.getUser();
		if (!user.getUserId().equals(requestDto.userId())) {
			throw new AccessDeniedException();
		}

		List<Integer> linkedNoteIds = new ArrayList<>();

		for (Integer targetNoteId : requestDto.targetNoteIds()) {
			Note targetNote = noteRepository.findById(targetNoteId)
				.orElseThrow(NoteNotFoundException::new);

			if (note.isLinkedTo(targetNote)) {
				throw new LinkAlreadyExistsException();
			}

			User targetNoteUser = targetNote.getUser();
			if (!targetNoteUser.getUserId().equals(requestDto.userId()) && !targetNote.isPublic()) {
				throw new AccessDeniedException();
			}

			Link link = Link.builder()
				.note(note)
				.linkedNote(targetNote)
				.build();

			linkRepository.save(link);
			targetNote.linkNote();
			linkedNoteIds.add(targetNoteId);
		}

		return new LinkNotesResponseDto(note.getNoteId(), linkedNoteIds);
	}

	public UnlinkNotesResponseDto unlinkNotes(UnlinkNotesRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(NoteNotFoundException::new);

		User user = note.getUser();
		if (!user.getUserId().equals(requestDto.userId())) {
			throw new AccessDeniedException();
		}

		List<Integer> unlinkedNoteIds = new ArrayList<>();

		for (Integer linkedNoteId : requestDto.linkedNoteIds()) { // todo: 하나씩 조회해서 삭제하는 비효율 개선
			Note linkedNote = noteRepository.findById(linkedNoteId)
				.orElseThrow(NoteNotFoundException::new);

			if (!note.isLinkedTo(linkedNote)) {
				throw new RuntimeException(); // todo
			}

			linkRepository.deleteByNoteAndLinkedNote(note, linkedNote);
			linkedNote.unlinkNote();
			unlinkedNoteIds.add(linkedNoteId);
		}

		return new UnlinkNotesResponseDto(note.getNoteId(), unlinkedNoteIds);
	}
}
