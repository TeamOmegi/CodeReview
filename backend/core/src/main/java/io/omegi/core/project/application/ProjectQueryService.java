package io.omegi.core.project.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.project.domain.Project;
import io.omegi.core.project.persistence.ProjectRepository;
import io.omegi.core.project.presentation.model.response.DrawProjectsViewResponse;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectQueryService {

	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;

	public DrawProjectsViewResponse drawProjectsView(Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(RuntimeException::new);

		List<Project> projects = projectRepository.findAllByUser(user);

		List<DrawProjectsViewResponse.ProjectResponse> projectResponses = projects.stream()
			.map(project -> DrawProjectsViewResponse.ProjectResponse.builder()
				.projectId(project.getProjectId())
				.name(project.getName())
				.build())
			.toList();

		return new DrawProjectsViewResponse(projectResponses);
	}
}
