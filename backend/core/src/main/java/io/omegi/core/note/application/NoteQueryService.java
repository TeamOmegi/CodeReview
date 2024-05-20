package io.omegi.core.note.application;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.note.application.exception.NoteNotFoundException;
import io.omegi.core.note.domain.Link;
import io.omegi.core.note.domain.Note;
import io.omegi.core.note.domain.NoteTag;
import io.omegi.core.note.domain.Tag;
import io.omegi.core.note.persistence.LinkRepository;
import io.omegi.core.note.persistence.NoteRepository;
import io.omegi.core.note.persistence.TagRepository;
import io.omegi.core.note.presentation.model.response.DrawAllNoteDetailViewResponse;
import io.omegi.core.note.presentation.model.response.DrawAllNoteListViewResponse;
import io.omegi.core.note.presentation.model.response.DrawMyNoteDetailViewResponse;
import io.omegi.core.note.presentation.model.response.DrawMyNoteGraphViewResponse;
import io.omegi.core.note.presentation.model.response.DrawMyNoteListViewResponse;
import io.omegi.core.project.domain.Error;
import io.omegi.core.project.presentation.model.response.DrawNoteSummaryViewResponse;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NoteQueryService {

	private final NoteRepository noteRepository;
	private final UserRepository userRepository;
	private final LinkRepository linkRepository;
	private final TagRepository tagRepository;

	public DrawMyNoteDetailViewResponse drawMyNoteDetailView(Integer userId, Integer noteId) {
		Note note = noteRepository.findById(noteId)
			.orElseThrow(NoteNotFoundException::new);

		User user = note.getUser();
		if (!user.getUserId().equals(userId)) {
			throw new AccessDeniedException();
		}

		List<String> tagNames = note.getNoteTags().stream()
			.map(NoteTag::getTag)
			.map(Tag::getName)
			.toList();

		Error error = note.getError();
		DrawMyNoteDetailViewResponse.RelatedErrorResponse relatedErrorResponse = null;
		if (error != null) {
			relatedErrorResponse = DrawMyNoteDetailViewResponse.RelatedErrorResponse.builder()
				.errorId(error.getErrorId())
				.errorType(error.getType())
				.summary(error.getSummary())
				.solved(error.isSolved())
				.build();
		}

		return DrawMyNoteDetailViewResponse.builder()
			.noteId(note.getNoteId())
			.title(note.getTitle())
			.content(note.getContent())
			.tags(tagNames)
			.type(note.getNoteType().getType().name())
			.visibility(note.getNoteVisibility().getVisibility().name())
			.backlinkCount(note.getBacklinkCount())
			.createdAt(note.getCreatedAt())
			.error(relatedErrorResponse)
			.build();
	}

	public DrawMyNoteListViewResponse drawMyNoteListView(Integer userId, String keyword, String tagName) {
		User user = userRepository.findById(userId)
			.orElseThrow(RuntimeException::new);

		List<Note> notes = noteRepository.searchMyNotes(user, keyword, tagName);

		List<DrawMyNoteListViewResponse.NoteResponse> noteResponses = notes.stream()
			.map(note -> {
				List<String> tagNames = note.getNoteTags().stream()
					.map(noteTag -> noteTag.getTag().getName())
					.toList();

				return DrawMyNoteListViewResponse.NoteResponse.builder()
					.noteId(note.getNoteId())
					.title(note.getTitle())
					.content(note.getContent())
					.tags(tagNames)
					.type(note.getNoteType().getType().name())
					.visibility(note.getNoteVisibility().getVisibility().name())
					.backlinkCount(note.getBacklinkCount())
					.createdAt(note.getCreatedAt())
					.errorId(note.getError() == null ? -1 : note.getError().getErrorId())
					.build();
			})
			.toList();

		return new DrawMyNoteListViewResponse(noteResponses);
	}

	public DrawMyNoteGraphViewResponse drawMyNoteGraphView(Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(RuntimeException::new);

		List<Note> notes = noteRepository.findAllByUser(user);
		List<Tag> tags = tagRepository.findAllByUser(user);

		Map<Integer, Integer> noteIndexes = new HashMap<>();
		Map<Integer, Integer> tagIndexes = new HashMap<>();

		List<DrawMyNoteGraphViewResponse.NodeResponse> nodes = new ArrayList<>();
		List<DrawMyNoteGraphViewResponse.EdgeResponse> edges = new ArrayList<>();

		int index = 1;

		for (Note note : notes) {
			noteIndexes.put(note.getNoteId(), index);
			DrawMyNoteGraphViewResponse.NodeResponse node = DrawMyNoteGraphViewResponse.NodeResponse.builder()
				.nodeId(note.getNoteId())
				.index(index)
				.value(note.getTitle())
				.type("MY_NOTE")
				.build();
			nodes.add(node);
			index++;
		}

		for (Tag tag : tags) {
			tagIndexes.put(tag.getTagId(), index);
			DrawMyNoteGraphViewResponse.NodeResponse node = DrawMyNoteGraphViewResponse.NodeResponse.builder()
				.nodeId(tag.getTagId())
				.index(index)
				.value(tag.getName())
				.type("TAG")
				.build();
			nodes.add(node);
			index++;
		}

		for (Note note : notes) {
			Integer noteIndex = noteIndexes.get(note.getNoteId());

			List<Link> links = note.getLinks();
			for (Link link : links) {
				Note linkedNote = link.getLinkedNote();

				if (!linkedNote.isPublic()) {
					continue;
				}

				Integer linkedNoteId = linkedNote.getNoteId();
				Integer linkedNoteIndex = null;

				if (noteIndexes.containsKey(linkedNoteId)) {
					linkedNoteIndex = noteIndexes.get(linkedNoteId);
				} else {
					linkedNoteIndex = index++;
					noteIndexes.put(linkedNoteId, linkedNoteIndex);
					DrawMyNoteGraphViewResponse.NodeResponse node = DrawMyNoteGraphViewResponse.NodeResponse.builder()
						.nodeId(linkedNoteId)
						.index(linkedNoteIndex)
						.value(linkedNote.getTitle())
						.type("OTHERS_NOTE")
						.build();
					nodes.add(node);
				}

				DrawMyNoteGraphViewResponse.EdgeResponse edge = DrawMyNoteGraphViewResponse.EdgeResponse.builder()
					.sourceIndex(noteIndex)
					.targetIndex(linkedNoteIndex)
					.build();
				edges.add(edge);
			}

			List<NoteTag> noteTags = note.getNoteTags();
			for (NoteTag noteTag : noteTags) {
				Tag tag = noteTag.getTag();

				Integer tagIndex = tagIndexes.get(tag.getTagId());

				DrawMyNoteGraphViewResponse.EdgeResponse edge = DrawMyNoteGraphViewResponse.EdgeResponse.builder()
					.sourceIndex(noteIndex)
					.targetIndex(tagIndex)
					.build();
				edges.add(edge);
			}
		}

		return new DrawMyNoteGraphViewResponse(nodes, edges);
	}

	public DrawAllNoteDetailViewResponse drawAllNoteDetailView(Integer noteId) {
		Note note = noteRepository.findById(noteId)
			.orElseThrow(NoteNotFoundException::new);

		if (!note.isPublic()) {
			throw new AccessDeniedException();
		}

		List<String> tagNames = note.getNoteTags().stream()
			.map(NoteTag::getTag)
			.map(Tag::getName)
			.toList();

		Error error = note.getError();
		DrawAllNoteDetailViewResponse.RelatedErrorResponse relatedErrorResponse = null;
		if (error != null) {
			relatedErrorResponse = DrawAllNoteDetailViewResponse.RelatedErrorResponse.builder()
				.errorId(error.getErrorId())
				.errorType(error.getType())
				.summary(error.getSummary())
				.solved(error.isSolved())
				.build();
		}

		User user = note.getUser();
		DrawAllNoteDetailViewResponse.UserResponse userResponse = DrawAllNoteDetailViewResponse.UserResponse.builder()
			.userId(user.getUserId())
			.username(user.getUsername())
			.profileImageUrl(user.getProfileImageUrl())
			.build();

		return DrawAllNoteDetailViewResponse.builder()
			.noteId(note.getNoteId())
			.title(note.getTitle())
			.content(note.getContent())
			.tags(tagNames)
			.type(note.getNoteType().getType().name())
			.visibility(note.getNoteVisibility().getVisibility().name())
			.backlinkCount(note.getBacklinkCount())
			.createdAt(note.getCreatedAt())
			.error(relatedErrorResponse)
			.user(userResponse)
			.build();
	}

	public DrawAllNoteListViewResponse drawAllNoteListView(Integer userId, String keyword) {
		User user = userRepository.findById(userId)
			.orElseThrow(RuntimeException::new);

		List<Note> notes = noteRepository.searchAllNotes(user, keyword);

		List<DrawAllNoteListViewResponse.NoteResponse> noteResponses = notes.stream()
			.map(note -> {
				User writer = note.getUser();

				DrawAllNoteListViewResponse.UserResponse userResponse = DrawAllNoteListViewResponse.UserResponse.builder()
					.userId(writer.getUserId())
					.username(writer.getUsername())
					.profileImageUrl(writer.getProfileImageUrl())
					.build();

				return DrawAllNoteListViewResponse.NoteResponse.builder()
					.noteId(note.getNoteId())
					.title(note.getTitle())
					.content(note.getContent())
					.createdAt(note.getCreatedAt())
					.isMine(writer.getUserId().equals(userId))
					.user(userResponse)
					.build();
			})
			.toList();

		return new DrawAllNoteListViewResponse(noteResponses);
	}

	public DrawNoteSummaryViewResponse drawNoteSummaryView(Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(RuntimeException::new);

		int noteCount = noteRepository.countByUser(user);
		int linkCount = linkRepository.countByUserToOthers(user);
		int backlinkCount = linkRepository.countByOthersToUser(user);

		return new DrawNoteSummaryViewResponse(noteCount, linkCount, backlinkCount);
	}
}
