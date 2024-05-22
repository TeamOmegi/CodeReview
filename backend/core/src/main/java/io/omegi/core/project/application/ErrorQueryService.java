package io.omegi.core.project.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.note.application.dto.request.DrawErrorsViewRequestDto;
import io.omegi.core.note.domain.Note;
import io.omegi.core.project.domain.Error;
import io.omegi.core.project.domain.Project;
import io.omegi.core.project.persistence.ErrorRepository;
import io.omegi.core.project.persistence.ProjectRepository;
import io.omegi.core.project.presentation.model.response.DrawErrorDetailViewResponse;
import io.omegi.core.project.presentation.model.response.DrawErrorSummaryViewResponse;
import io.omegi.core.project.presentation.model.response.DrawErrorsViewResponse;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ErrorQueryService {

	private final ErrorRepository errorRepository;
	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;

	public DrawErrorDetailViewResponse drawErrorDetailView(Integer userId, Integer errorId) {
		Error error = errorRepository.findById(errorId)
			.orElseThrow(RuntimeException::new);

		io.omegi.core.project.domain.Service service = error.getService();
		Project project = service.getProject();
		User user = project.getUser();

		if (!user.getUserId().equals(userId)) {
			throw new AccessDeniedException(); // todo
		}

		Note note = error.getNote();

		return DrawErrorDetailViewResponse.builder()
			.summary(error.getSummary())
			.log("") // todo
			.noteId(note != null ? note.getNoteId() : -1)
			.build();
	}

	public DrawErrorsViewResponse drawErrorsView(DrawErrorsViewRequestDto requestDto) {
		Project project = projectRepository.findByName(requestDto.projectName())
			.orElseThrow(RuntimeException::new);

		User user = project.getUser();
		if (!user.getUserId().equals(requestDto.userId())) {
			throw new AccessDeniedException();
		}

		List<Error> errors = errorRepository.searchErrors(requestDto.projectName(), requestDto.serviceName(),
			requestDto.solved(), requestDto.errorType());

		List<DrawErrorsViewResponse.ErrorResponse> errorResponses = errors.stream()
			.map(error -> DrawErrorsViewResponse.ErrorResponse.builder()
						.errorId(error.getErrorId())
						.isSolved(error.isSolved())
						.errorType(error.getType())
						.project(project.getName())
						.service(error.getService().getName())
						.time(error.getTime())
						.pastNoteCount(0) // todo
						.build()
			)
			.toList();

		return new DrawErrorsViewResponse(errorResponses);
	}

	public DrawErrorSummaryViewResponse drawErrorSummaryView(Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(RuntimeException::new);

		int solvedErrorCount = errorRepository.countByUserAndSolved(user, true);
		int unsolvedErrorCount = errorRepository.countByUserAndSolved(user, false);
		Error recentError = errorRepository.findTopByUserOrderByCreatedAt(user)
			.orElseThrow(RuntimeException::new);

		return new DrawErrorSummaryViewResponse(solvedErrorCount, unsolvedErrorCount, recentError.getCreatedAt());
	}
}
