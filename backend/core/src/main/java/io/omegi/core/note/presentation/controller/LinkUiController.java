package io.omegi.core.note.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.note.application.LinkQueryService;
import io.omegi.core.note.application.dto.request.DrawIsLinkedViewRequestDto;
import io.omegi.core.note.presentation.model.response.DrawIsLinkedViewResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes/link")
@RequiredArgsConstructor
public class LinkUiController {

	private final LinkQueryService linkQueryService;

	@GetMapping
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_IS_LINKED_VIEW_SUCCESS)
	public DrawIsLinkedViewResponse drawIsLinkedView(@Login Integer userId, @RequestParam Integer noteId, @RequestParam Integer targetNoteId) {
		DrawIsLinkedViewRequestDto requestDto = new DrawIsLinkedViewRequestDto(userId, noteId, targetNoteId);
		return linkQueryService.isLinked(requestDto);
	}
}
