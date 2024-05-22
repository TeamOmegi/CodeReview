package io.omegi.core.project.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.project.application.dto.request.MarkErrorSolvedRequestDto;
import io.omegi.core.project.application.dto.response.MarkErrorSolvedResponseDto;
import io.omegi.core.project.domain.Error;
import io.omegi.core.project.domain.Project;
import io.omegi.core.project.persistence.ErrorRepository;
import io.omegi.core.user.domain.User;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ErrorCommandService {

	private final ErrorRepository errorRepository;

	public MarkErrorSolvedResponseDto markErrorSolved(MarkErrorSolvedRequestDto requestDto) {
		Error error = errorRepository.findById(requestDto.errorId())
			.orElseThrow(RuntimeException::new);

		io.omegi.core.project.domain.Service service = error.getService();
		Project project = service.getProject();
		User user = project.getUser();

		if (!user.getUserId().equals(requestDto.userId())) {
			throw new AccessDeniedException(requestDto.userId(), null);
		}

		error.solve();

		return new MarkErrorSolvedResponseDto(error.getErrorId());
	}
}
