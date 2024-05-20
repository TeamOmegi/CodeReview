package io.omegi.core.project.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.project.application.dto.request.CreateProjectRequestDto;
import io.omegi.core.project.application.dto.request.DeleteProjectRequestDto;
import io.omegi.core.project.application.dto.request.EditProjectRequestDto;
import io.omegi.core.project.application.dto.response.CreateProjectResponseDto;
import io.omegi.core.project.application.dto.response.DeleteProjectResponseDto;
import io.omegi.core.project.application.dto.response.EditProjectResponseDto;
import io.omegi.core.project.domain.Project;
import io.omegi.core.project.persistence.ProjectRepository;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectCommandService {

	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;

	public CreateProjectResponseDto createProject(CreateProjectRequestDto requestDto) {
		User user = userRepository.findById(requestDto.userId())
			.orElseThrow(RuntimeException::new);// todo

		Project project = Project.builder()
			.user(user)
			.name(requestDto.name())
			.build();

		projectRepository.save(project);

		return new CreateProjectResponseDto(project.getProjectId());
	}

	public EditProjectResponseDto editProject(EditProjectRequestDto requestDto) {
		Project project = projectRepository.findById(requestDto.projectId())
			.orElseThrow(RuntimeException::new);

		User user = project.getUser();

		if (!user.getUserId().equals(requestDto.userId())) {
			throw new AccessDeniedException();
		}

		project.editName(requestDto.name());

		return new EditProjectResponseDto(project.getProjectId());
	}

	public DeleteProjectResponseDto deleteProject(DeleteProjectRequestDto requestDto) {
		Project project = projectRepository.findById(requestDto.projectId())
			.orElseThrow(RuntimeException::new);

		User user = project.getUser();

		if (!user.getUserId().equals(requestDto.userId())) {
			throw new AccessDeniedException();
		}

		projectRepository.delete(project);

		return new DeleteProjectResponseDto(project.getProjectId());
	}
}
