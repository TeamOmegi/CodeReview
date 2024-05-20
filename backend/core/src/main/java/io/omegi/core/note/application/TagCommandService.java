package io.omegi.core.note.application;

import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.note.application.dto.request.AttachTagsRequestDto;
import io.omegi.core.note.application.dto.request.SaveTagRequestDto;
import io.omegi.core.note.application.dto.request.UpdateTagsRequestDto;
import io.omegi.core.note.application.event.UnknownTagQueriedEvent;
import io.omegi.core.note.application.exception.NoteNotFoundException;
import io.omegi.core.note.application.exception.TagNotFoundException;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.domain.NoteTag;
import io.omegi.core.note.domain.Tag;
import io.omegi.core.note.persistence.NoteRepository;
import io.omegi.core.note.persistence.NoteTagRepository;
import io.omegi.core.note.persistence.TagRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TagCommandService {

	private final TagRepository tagRepository;
	private final NoteTagRepository noteTagRepository;
	private final NoteRepository noteRepository;

	private final ApplicationEventPublisher eventPublisher;

	public void saveTag(SaveTagRequestDto requestDto) {
		if (tagRepository.existsByName(requestDto.name())) {
			throw new RuntimeException(); // todo
		}

		Tag tag = Tag.builder()
			.name(requestDto.name())
			.build();

		tagRepository.save(tag);
	}

	public void attachTags(AttachTagsRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(NoteNotFoundException::new);

		for (String tagName : requestDto.tagNames()) {
			if (!tagRepository.existsByName(tagName)) {
				eventPublisher.publishEvent(new UnknownTagQueriedEvent(tagName)); // todo: 동시에 같은 태그가 저장 시도된 경우?
			}

			Tag tag = tagRepository.findByName(tagName)
				.orElseThrow(TagNotFoundException::new);

			NoteTag noteTag = NoteTag.builder()
				.note(note)
				.tag(tag)
				.build();

			noteTagRepository.save(noteTag);
		}
	}

	public void detachTags() {

	}

	public void updateTags(UpdateTagsRequestDto requestDto) {
		Note note = noteRepository.findById(requestDto.noteId())
			.orElseThrow(NoteNotFoundException::new);

		List<NoteTag> noteTags = note.getNoteTags();

		for (NoteTag noteTag : noteTags) {
			Tag tag = noteTag.getTag();
			if (!requestDto.tagNames().contains(tag.getName())) {
				noteTagRepository.delete(noteTag);
			} else {
				requestDto.tagNames().remove(tag.getName());
			}
		}

		for (String tagName : requestDto.tagNames()) { // todo: publish event
			if (!tagRepository.existsByName(tagName)) {
				eventPublisher.publishEvent(new UnknownTagQueriedEvent(tagName)); // todo: 동시에 같은 태그가 저장 시도된 경우?
			}

			Tag tag = tagRepository.findByName(tagName)
				.orElseThrow(TagNotFoundException::new);

			NoteTag noteTag = NoteTag.builder()
				.note(note)
				.tag(tag)
				.build();

			noteTagRepository.save(noteTag);
		}
	}
}
