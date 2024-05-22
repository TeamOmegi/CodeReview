package io.omegi.core.project.application;

import java.util.List;
import java.util.stream.Collectors;

import io.omegi.core.project.application.dto.response.*;
import io.omegi.core.project.presentation.model.response.GetAllServiceTokenFromProjectResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.common.jwt.JWTUtil;
import io.omegi.core.project.application.dto.request.CreateProjectRequestDto;
import io.omegi.core.project.application.dto.request.CreateServiceTokenRequestDto;
import io.omegi.core.project.application.dto.request.DeleteProjectRequestDto;
import io.omegi.core.project.application.dto.request.DeleteServiceTokenRequestDto;
import io.omegi.core.project.application.dto.request.EditProjectRequestDto;
import io.omegi.core.project.domain.Project;
import io.omegi.core.project.domain.ServiceToken;
import io.omegi.core.project.domain.ServiceType;
import io.omegi.core.project.persistence.ProjectRepository;
import io.omegi.core.project.persistence.ServiceRepository;
import io.omegi.core.project.persistence.ServiceTokenRepository;
import io.omegi.core.project.persistence.ServiceTypeRepository;
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
	private final ServiceTypeRepository serviceTypeRepository;
	private final JWTUtil jwtUtil;

	public CreateProjectResponseDto createProject(CreateProjectRequestDto requestDto) {
		User user = userRepository.findById(requestDto.userId())
				.orElseThrow(RuntimeException::new);

		if (projectRepository.existsByUserAndName(user, requestDto.projectName())) {
			throw new RuntimeException();
		}

		Project project = Project.builder()
				.user(user)
				.name(requestDto.projectName())
				.build();

		for (CreateProjectRequestDto.ServiceRequestDto serviceRequestDto : requestDto.services()) {
			Integer serviceTypeId = serviceRequestDto.serviceTypeId();
			ServiceType serviceType = serviceTypeRepository.findById(serviceTypeId)
				.orElseThrow(RuntimeException::new);

			io.omegi.core.project.domain.Service service = io.omegi.core.project.domain.Service.builder()
				.project(project)
				.serviceType(serviceType)
				.name(serviceRequestDto.serviceName())
				.build();

			project.addService(service);
		}

		projectRepository.save(project);

		List<Integer> serviceIds = project.getServices().stream()
			.map(io.omegi.core.project.domain.Service::getServiceId)
			.toList();

		return new CreateProjectResponseDto(project.getProjectId(), serviceIds);
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
		if (service.getProject() == null) {
			throw new AccessDeniedException();
		}
		Integer projectId = service.getProject().getProjectId();
		System.out.println(projectId);
		String token = jwtUtil.createJwtForService(projectId, service.getServiceId());
		ServiceToken serviceToken = ServiceToken.builder()
				.name(requestDto.name())
				.token(token)
				.activated(true)                                                                                                                                                                                      .build();
		serviceTokenRepository.save(serviceToken);
		service.registerServiceToken(serviceToken);
		return new CreateServiceTokenResponseDto(token);

	}
	public DeleteServiceTokenResponseDto deleteServiceToken(DeleteServiceTokenRequestDto requestDto) {
		io.omegi.core.project.domain.Service service = serviceRepository.findById(requestDto.serviceTokenId())
				.orElseThrow(RuntimeException::new);
		ServiceToken serviceToken = service.getServiceToken();
		serviceTokenRepository.delete(serviceToken);
		return new DeleteServiceTokenResponseDto(requestDto.serviceTokenId());
	}

	public GetAllServiceTokenFromProjectResponse getAllServiceTokenFromProject(Integer userId, Integer projectId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found"));

		Project project = projectRepository.findByUserAndProjectId(user, projectId)
				.orElseThrow(() -> new RuntimeException("Project not found"));

		List<GetAllServiceTokenFromProjectResponse.ServiceTokenResponse> serviceTokenResponses = project.getServices().stream()
				.filter(service -> service.getServiceToken() != null)
				.map(service -> new GetAllServiceTokenFromProjectResponse.ServiceTokenResponse(
						service.getServiceId(),
						service.getServiceToken().getToken()
				))
				.collect(Collectors.toList());

		return new GetAllServiceTokenFromProjectResponse(serviceTokenResponses);
	}

}