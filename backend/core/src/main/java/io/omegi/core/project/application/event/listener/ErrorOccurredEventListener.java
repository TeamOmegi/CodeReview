package io.omegi.core.project.application.event.listener;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import io.omegi.core.project.application.RealTimeErrorQueryService;
import io.omegi.core.project.application.dto.request.SendErrorsRequestDto;
import io.omegi.core.project.application.event.ErrorOccurredEvent;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ErrorOccurredEventListener {

	private final RealTimeErrorQueryService realTimeErrorQueryService;

	@EventListener
	public void sendError(ErrorOccurredEvent event) {
		SendErrorsRequestDto requestDto = new SendErrorsRequestDto(event.errorId());
		realTimeErrorQueryService.sendErrors(requestDto);
	}
}
