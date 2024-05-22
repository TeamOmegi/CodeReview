package io.omegi.core.project.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import io.omegi.core.common.presentation.sse.SseEmitterManager;
import io.omegi.core.project.application.dto.request.SendErrorsRequestDto;
import io.omegi.core.project.application.dto.request.SubscribeErrorsRequestDto;
import io.omegi.core.project.application.dto.request.UnsubscribeErrorsRequestDto;
import io.omegi.core.project.domain.Error;
import io.omegi.core.project.domain.Project;
import io.omegi.core.project.persistence.ErrorRepository;
import io.omegi.core.project.presentation.model.response.sse.RealTimeErrorResponse;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RealTimeErrorQueryService {

	private final SseEmitterManager sseEmitterManager;
	private final ErrorRepository errorRepository;
	private final UserRepository userRepository;

	private final String SSE_NAME = "REAL_TIME_ERROR";

	public SseEmitter subscribeErrors(SubscribeErrorsRequestDto requestDto) {
		User user = userRepository.findById(requestDto.userId())
			.orElseThrow();
		List<Error> unsolvedErrors = errorRepository.findUnsolvedErrors(user);

		SseEmitter sseEmitter = sseEmitterManager.create(requestDto.userId());

		for (Error error : unsolvedErrors) {
			io.omegi.core.project.domain.Service service = error.getService();
			Project project = service.getProject();

			RealTimeErrorResponse errorResponse = RealTimeErrorResponse.builder()
				.errorId(error.getErrorId())
				.serviceId(service.getServiceId())
				.projectId(project.getProjectId())
				.serviceName(service.getName())
				.projectName(project.getName())
				.solved(error.isSolved())
				.type(error.getType())
				.time(error.getTime())
				.build();

			sseEmitterManager.sendEvent(user.getUserId(), user.getUserId().toString(), SSE_NAME, errorResponse);
		}

		return sseEmitter;
	}

	public void unsubscribeErrors(UnsubscribeErrorsRequestDto requestDto) {
		sseEmitterManager.complete(requestDto.userId());
	}

	public void sendErrors(SendErrorsRequestDto requestDto) {
		Error error = errorRepository.findById(requestDto.errorId())
			.orElseThrow(RuntimeException::new);

		io.omegi.core.project.domain.Service service = error.getService();
		Project project = service.getProject();
		User user = project.getUser();

		RealTimeErrorResponse errorResponse = RealTimeErrorResponse.builder()
			.errorId(error.getErrorId())
			.serviceId(service.getServiceId())
			.projectId(project.getProjectId())
			.serviceName(service.getName())
			.projectName(project.getName())
			.solved(error.isSolved())
			.type(error.getType())
			.time(error.getTime())
			.build();

		sseEmitterManager.sendEvent(user.getUserId(), error.getErrorId().toString(), SSE_NAME, errorResponse);
	}
}
