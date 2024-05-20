package io.omegi.core.project.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.project.application.ProjectCommandService;
import io.omegi.core.project.application.dto.request.CreateProjectRequestDto;
import io.omegi.core.project.application.dto.request.DeleteProjectRequestDto;
import io.omegi.core.project.application.dto.request.EditProjectRequestDto;
import io.omegi.core.project.application.dto.response.CreateProjectResponseDto;
import io.omegi.core.project.application.dto.response.DeleteProjectResponseDto;
import io.omegi.core.project.application.dto.response.EditProjectResponseDto;
import io.omegi.core.project.presentation.model.request.CreateProjectRequest;
import io.omegi.core.project.presentation.model.request.EditProjectRequest;
import io.omegi.core.project.presentation.model.response.CreateProjectResponse;
import io.omegi.core.project.presentation.model.response.DeleteProjectResponse;
import io.omegi.core.project.presentation.model.response.EditProjectResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

	private final ProjectCommandService projectCommandService;

	@PostMapping
	@ResponseStatus(CREATED)
	@ResponseWrapping(status = SAVE_PROJECT_SUCCESS)
	public CreateProjectResponse createProject(@Login Integer userId, @RequestBody CreateProjectRequest request) {
		CreateProjectRequestDto requestDto = new CreateProjectRequestDto(userId, request.name());
		CreateProjectResponseDto responseDto = projectCommandService.createProject(requestDto);
		return new CreateProjectResponse(responseDto.projectId());
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
	@ResponseStatus(NO_CONTENT)
	@ResponseWrapping(status = DELETE_PROJECT_SUCCESS)
	public DeleteProjectResponse deleteProject(@Login Integer userId, @PathVariable Integer projectId) {
		DeleteProjectRequestDto requestDto = new DeleteProjectRequestDto(userId, projectId);
		DeleteProjectResponseDto responseDto = projectCommandService.deleteProject(requestDto);
		return new DeleteProjectResponse(responseDto.projectId());
	}
}
