package io.omegi.core.project.presentation.controller;

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
import io.omegi.core.note.application.dto.request.DrawErrorsViewRequestDto;
import io.omegi.core.project.application.ErrorQueryService;
import io.omegi.core.project.presentation.model.response.DrawErrorDetailViewResponse;
import io.omegi.core.project.presentation.model.response.DrawErrorSummaryViewResponse;
import io.omegi.core.project.presentation.model.response.DrawErrorsViewResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/errors")
@RequiredArgsConstructor
public class ErrorUiController {

	private final ErrorQueryService errorQueryService;

	@GetMapping("/{errorId}")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_ERROR_DETAIL_VIEW_SUCCESS)
	public DrawErrorDetailViewResponse drawErrorDetailView(@Login Integer userId, @PathVariable Integer errorId) {
		return errorQueryService.drawErrorDetailView(userId, errorId);
	}

	@GetMapping
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_ERRORS_VIEW_SUCCESS)
	public DrawErrorsViewResponse drawErrorsView(@Login Integer userId, @RequestParam String project,
		@RequestParam(required = false) String service, @RequestParam(required = false) Boolean solved,
		@RequestParam(required = false) String errorType) {
		DrawErrorsViewRequestDto requestDto = new DrawErrorsViewRequestDto(userId, project, service, solved, errorType);
		return errorQueryService.drawErrorsView(requestDto);
	}

	@GetMapping("/summary")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_ERROR_SUMMARY_VIEW_SUCCESS)
	public DrawErrorSummaryViewResponse drawErrorSummaryView(@Login Integer userId) {
		return errorQueryService.drawErrorSummaryView(userId);
	}
}
