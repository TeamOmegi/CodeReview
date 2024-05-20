package io.omegi.core.project.presentation.controller;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.project.application.RealTimeErrorQueryService;
import io.omegi.core.project.application.dto.request.SubscribeErrorsRequestDto;
import io.omegi.core.project.application.dto.request.UnsubscribeErrorsRequestDto;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/errors/real-time")
@RequiredArgsConstructor
public class ErrorUiSseController {

	private final RealTimeErrorQueryService realTimeErrorQueryService;

	@GetMapping(value = "/subscription", produces = TEXT_EVENT_STREAM_VALUE)
	@ResponseStatus(OK)
	public SseEmitter subscribe(@Login Integer userId) {
		SubscribeErrorsRequestDto requestDto = new SubscribeErrorsRequestDto(userId);
		return realTimeErrorQueryService.subscribeErrors(requestDto);
	}

	@DeleteMapping("/subscription")
	@ResponseStatus(OK)
	public void unsubscribe(@Login Integer userId) {
		UnsubscribeErrorsRequestDto requestDto = new UnsubscribeErrorsRequestDto(userId);
		realTimeErrorQueryService.unsubscribeErrors(requestDto);
	}
}
