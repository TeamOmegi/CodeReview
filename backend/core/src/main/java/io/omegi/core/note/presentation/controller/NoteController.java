package io.omegi.core.note.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.note.application.NoteCommandService;
import io.omegi.core.note.application.dto.request.DeleteNoteRequestDto;
import io.omegi.core.note.application.dto.request.EditNoteRequestDto;
import io.omegi.core.note.application.dto.request.SaveNoteRequestDto;
import io.omegi.core.note.application.dto.response.DeleteNoteResponseDto;
import io.omegi.core.note.application.dto.response.EditNoteResponseDto;
import io.omegi.core.note.application.dto.response.SaveNoteResponseDto;
import io.omegi.core.note.presentation.model.request.EditNoteRequest;
import io.omegi.core.note.presentation.model.request.SaveNoteRequest;
import io.omegi.core.note.presentation.model.response.DeleteNoteResponse;
import io.omegi.core.note.presentation.model.response.EditNoteResponse;
import io.omegi.core.note.presentation.model.response.SaveNoteResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {

	private final NoteCommandService noteCommandService;

	@PostMapping
	@ResponseStatus(CREATED)
	@ResponseWrapping(status = SAVE_NOTE_SUCCESS)
	public SaveNoteResponse saveNote(@Login Integer userId, @RequestBody SaveNoteRequest request) {
		SaveNoteRequestDto requestDto = SaveNoteRequestDto.builder()
			.userId(userId)
			.title(request.title())
			.content(request.content())
			.tagNames(request.tags())
			.type(request.type())
			.visibility(request.visibility())
			.targetNoteIds(request.links())
			.build();
		SaveNoteResponseDto responseDto = noteCommandService.saveNote(requestDto);
		return new SaveNoteResponse(responseDto.noteId());
	}

	@PatchMapping("/{noteId}")
	@ResponseStatus(OK)
	@ResponseWrapping(status = EDIT_NOTE_SUCCESS)
	public EditNoteResponse editNote(@Login Integer userId, @PathVariable Integer noteId, @RequestBody EditNoteRequest request) {
		EditNoteRequestDto requestDto = EditNoteRequestDto.builder()
			.userId(userId)
			.noteId(noteId)
			.title(request.title())
			.content(request.content())
			.tagNames(request.tags())
			.noteType(request.type())
			.noteVisibility(request.visibility())
			.linkedNoteIds(request.links())
			.build();
		EditNoteResponseDto responseDto = noteCommandService.editNote(requestDto);
		return new EditNoteResponse(responseDto.noteId());
	}

	@DeleteMapping("/{noteId}")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DELETE_NOTE_SUCCESS)
	public DeleteNoteResponse deleteNote(@Login Integer userId, @PathVariable Integer noteId) {
		DeleteNoteRequestDto requestDto = new DeleteNoteRequestDto(userId, noteId);
		DeleteNoteResponseDto responseDto = noteCommandService.deleteNote(requestDto);
		return new DeleteNoteResponse(responseDto.noteId());
	}
}
