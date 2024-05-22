package io.omegi.core.note.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.note.application.NoteQueryService;
import io.omegi.core.note.presentation.model.response.DrawAllNoteDetailViewResponse;
import io.omegi.core.note.presentation.model.response.DrawAllNoteListViewResponse;
import io.omegi.core.note.presentation.model.response.DrawMyNoteDetailViewResponse;
import io.omegi.core.note.presentation.model.response.DrawMyNoteGraphViewResponse;
import io.omegi.core.note.presentation.model.response.DrawMyNoteListViewResponse;
import io.omegi.core.project.presentation.model.response.DrawNoteSummaryViewResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteUiController {

	private final NoteQueryService noteQueryService;

	@GetMapping("/{noteId}")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_MY_NOTE_DETAIL_VIEW_SUCCESS)
	public DrawMyNoteDetailViewResponse drawMyNoteDetailView(@Login Integer userId, @PathVariable Integer noteId) {
		return noteQueryService.drawMyNoteDetailView(userId, noteId);
	}

	@GetMapping("/list")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_MY_NOTE_LIST_VIEW_SUCCESS)
	public DrawMyNoteListViewResponse drawMyNoteListView(@Login Integer userId,
		@RequestParam(required = false) String keyword, @RequestParam(required = false) String tag) {
		return noteQueryService.drawMyNoteListView(userId, keyword, null);
	}

	@GetMapping("/graph")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_MY_NOTE_GRAPH_VIEW_SUCCESS)
	public DrawMyNoteGraphViewResponse drawMyNoteGraphView(@Login Integer userId) {
		return noteQueryService.drawMyNoteGraphView(userId);
	}

	@GetMapping("/others")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_ALL_NOTE_LIST_VIEW_SUCCESS)
	public DrawAllNoteListViewResponse drawAllNoteListView(@Login(nullable = true) Integer userId,
		@RequestParam(required = false) String keyword) {
		return noteQueryService.drawAllNoteListView(userId, keyword);
	}

	@GetMapping("/others/{noteId}")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_ALL_NOTE_DETAIL_VIEW_SUCCESS)
	public DrawAllNoteDetailViewResponse drawAllNoteDetailView(@PathVariable Integer noteId) {
		return noteQueryService.drawAllNoteDetailView(noteId);
	}

	@GetMapping("/summary")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_NOTE_SUMMARY_VIEW_SUCCESS)
	public DrawNoteSummaryViewResponse drawNoteSummaryView(@Login Integer userId) {
		return noteQueryService.drawNoteSummaryView(userId);
	}
}
