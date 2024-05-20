package io.omegi.core.note.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.note.application.LinkCommandService;
import io.omegi.core.note.application.dto.request.LinkNotesRequestDto;
import io.omegi.core.note.application.dto.request.UnlinkNotesRequestDto;
import io.omegi.core.note.application.dto.response.LinkNotesResponseDto;
import io.omegi.core.note.application.dto.response.UnlinkNotesResponseDto;
import io.omegi.core.note.presentation.model.request.LinkNoteRequest;
import io.omegi.core.note.presentation.model.request.UnlinkNoteRequest;
import io.omegi.core.note.presentation.model.response.LinkNoteResponse;
import io.omegi.core.note.presentation.model.response.UnlinkNoteResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes/link")
@RequiredArgsConstructor
public class LinkController {

	private final LinkCommandService linkCommandService;

	@PostMapping
	@ResponseStatus(OK)
	@ResponseWrapping(status = LINK_NOTE_SUCCESS)
	public LinkNoteResponse linkNote(@Login Integer userId, @RequestBody LinkNoteRequest request) {
		LinkNotesRequestDto requestDto = new LinkNotesRequestDto(userId, request.noteId(), List.of(request.targetNoteId()));
		LinkNotesResponseDto responseDto = linkCommandService.linkNotes(requestDto);
		return new LinkNoteResponse(responseDto.noteId(), responseDto.linkedNoteIds().getFirst());
	}

	@DeleteMapping
	@ResponseStatus(OK)
	@ResponseWrapping(status = UNLINK_NOTE_SUCCESS)
	public UnlinkNoteResponse unlinkNote(@Login Integer userId, @RequestBody UnlinkNoteRequest request) {
		UnlinkNotesRequestDto requestDto = new UnlinkNotesRequestDto(userId, request.noteId(), List.of(request.targetNoteId()));
		UnlinkNotesResponseDto responseDto = linkCommandService.unlinkNotes(requestDto);
		return new UnlinkNoteResponse(responseDto.noteId(), responseDto.unlinkedNoteIds().getFirst());
	}
}
