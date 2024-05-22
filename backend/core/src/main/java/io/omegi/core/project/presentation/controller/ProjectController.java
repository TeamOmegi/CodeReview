package io.omegi.core.project.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;



import io.omegi.core.project.application.dto.request.*;
import io.omegi.core.project.application.dto.response.*;
import io.omegi.core.project.application.dto.response.DeleteServiceTokenResponseDto;
import io.omegi.core.project.presentation.model.request.CreateServiceTokenRequest;
import io.omegi.core.project.presentation.model.response.*;
import org.springframework.web.bind.annotation.*;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.project.application.ProjectCommandService;
import io.omegi.core.project.presentation.model.request.CreateProjectRequest;
import io.omegi.core.project.presentation.model.request.EditProjectRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

	private final ProjectCommandService projectCommandService;

	@PostMapping
	@ResponseStatus(CREATED)
	@ResponseWrapping(status = SAVE_PROJECT_SUCCESS)
	public CreateProjectResponse createProject(@Login Integer userId, @RequestBody CreateProjectRequest request) {
		CreateProjectRequestDto requestDto = new CreateProjectRequestDto(
			userId, request.projectName(),
			request.services().stream()
			.map(serviceRequest -> new CreateProjectRequestDto.ServiceRequestDto(serviceRequest.serviceTypeId(), serviceRequest.serviceName()))
			.toList());
		CreateProjectResponseDto responseDto = projectCommandService.createProject(requestDto);
		return new CreateProjectResponse(responseDto.projectId(), responseDto.serviceIds());
	}

	@PatchMapping("/{projectId}")
	@ResponseStatus(OK)
	@ResponseWrapping(status = EDIT_PROJECT_SUCCESS)
	public EditProjectResponse editProject(@Login Integer userId, @PathVariable Integer projectId,
										   @RequestBody EditProjectRequest request) {
		EditProjectRequestDto requestDto = new EditProjectRequestDto(userId, projectId, request.name());
		EditProjectResponseDto responseDto = projectCommandService.editProject(requestDto);
		return new EditProjectResponse(responseDto.projectId());
	}

	@DeleteMapping("/{projectId}")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DELETE_PROJECT_SUCCESS)
	public DeleteProjectResponse deleteProject(@Login Integer userId, @PathVariable Integer projectId) {
		DeleteProjectRequestDto requestDto = new DeleteProjectRequestDto(userId, projectId);
		DeleteProjectResponseDto responseDto = projectCommandService.deleteProject(requestDto);
		return new DeleteProjectResponse(responseDto.projectId());
	}

	@PostMapping("/{projectId}/services/{serviceId}/tokens")
	@ResponseStatus(CREATED)
	public CreateServiceTokenResponse createServiceToken(@Login Integer userId, @PathVariable Integer projectId, @PathVariable Integer serviceId, @RequestBody CreateServiceTokenRequest request) {
		CreateServiceTokenRequestDto requestDto = new CreateServiceTokenRequestDto(userId, projectId, serviceId, request.name());
		CreateServiceTokenResponseDto responseDto = projectCommandService.createServiceToken(requestDto);
		return new CreateServiceTokenResponse(responseDto.serviceToken());
	}
	@DeleteMapping("/{projectId}/services/{serviceId}/tokens")
	@ResponseStatus(OK)
	public DeleteServiceTokenResponse DeleteServiceToken(@Login Integer userId, @PathVariable Integer projectId, @PathVariable Integer serviceId) {
		DeleteServiceTokenRequestDto requestDto = new DeleteServiceTokenRequestDto(userId, projectId, serviceId);
		DeleteServiceTokenResponseDto responseDto = projectCommandService.deleteServiceToken(requestDto);
		return new DeleteServiceTokenResponse(responseDto.serviceId());
	}

	@GetMapping("/{projectId}/serviceTokens")
	@ResponseStatus(OK)
	public GetAllServiceTokenFromProjectResponse getAllServiceTokenFromProject(@Login Integer userId, @PathVariable Integer projectId) {
		return projectCommandService.getAllServiceTokenFromProject(userId, projectId);
	}
}