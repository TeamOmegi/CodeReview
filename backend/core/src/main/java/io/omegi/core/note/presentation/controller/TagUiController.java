package io.omegi.core.note.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.note.application.TagQueryService;
import io.omegi.core.note.presentation.model.response.DrawMyTagsViewResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagUiController {

	private final TagQueryService tagQueryService;

	@GetMapping
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_MY_TAGS_VIEW_SUCCESS)
	public DrawMyTagsViewResponse drawMyTagsView(@Login Integer userId) {
		return tagQueryService.drawMyTagsView(userId);
	}
}
