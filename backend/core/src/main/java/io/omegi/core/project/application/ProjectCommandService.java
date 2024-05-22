package io.omegi.core.project.application;

import io.omegi.core.common.jwt.JWTUtil;
import org.springframework.stereotype.Service;
import io.omegi.core.project.application.dto.request.*;
import io.omegi.core.project.application.dto.response.*;
import io.omegi.core.project.domain.ServiceToken;
import io.omegi.core.project.persistence.ServiceRepository;
import io.omegi.core.project.persistence.ServiceTokenRepository;

import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
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
	private final ServiceRepository serviceRepository;
	private final ServiceTokenRepository serviceTokenRepository;
	private final JWTUtil jwtUtil;

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

	public CreateServiceTokenResponseDto createServiceToken(CreateServiceTokenRequestDto requestDto){
		io.omegi.core.project.domain.Service service = serviceRepository.findById(requestDto.serviceId())
				.orElseThrow(RuntimeException::new);
		ServiceToken existingToken = service.getServiceToken();
		if (existingToken != null) {
			throw new AccessDeniedException();
		}
		String token = jwtUtil.createJwtForService(service.getServiceId(), Long.MAX_VALUE);
		ServiceToken serviceToken = ServiceToken.builder()
				.name(requestDto.name())
				.token(token)
				.activated(true)                                                                                                                                                                                      .build();
		serviceTokenRepository.save(serviceToken);
		service.registerServiceToken(serviceToken);
		serviceRepository.save(service);
		return new CreateServiceTokenResponseDto(token);

	}
	public DeleteServiceTokenResponseDto deleteServiceToken(DeleteServiceTokenRequestDto requestDto) {
		io.omegi.core.project.domain.Service service = serviceRepository.findById(requestDto.serviceId())
				.orElseThrow(RuntimeException::new);
		ServiceToken serviceToken = service.getServiceToken();
		serviceTokenRepository.delete(serviceToken);
		return new DeleteServiceTokenResponseDto(requestDto.serviceId());
	}
}
