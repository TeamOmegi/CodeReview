package io.omegi.core.project.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.project.application.ErrorCommandService;
import io.omegi.core.project.application.dto.request.MarkErrorSolvedRequestDto;
import io.omegi.core.project.application.dto.response.MarkErrorSolvedResponseDto;
import io.omegi.core.project.presentation.model.response.MarkErrorSolvedResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/errors")
@RequiredArgsConstructor
public class ErrorController {

	private final ErrorCommandService errorCommandService;

	@PostMapping("/{errorId}/solved")
	@ResponseStatus(OK)
	@ResponseWrapping(status = MARK_ERROR_SOLVED_SUCCESS)
	public MarkErrorSolvedResponse markErrorSolved(@Login Integer userId, @PathVariable Integer errorId) {
		MarkErrorSolvedRequestDto requestDto = new MarkErrorSolvedRequestDto(userId, errorId);
		MarkErrorSolvedResponseDto responseDto = errorCommandService.markErrorSolved(requestDto);
		return new MarkErrorSolvedResponse(responseDto.errorId());
	}
}
