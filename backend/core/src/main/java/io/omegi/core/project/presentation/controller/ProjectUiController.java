package io.omegi.core.project.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.project.application.ProjectQueryService;
import io.omegi.core.project.presentation.model.response.DrawProjectsViewResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectUiController {

	private final ProjectQueryService projectQueryService;

	@GetMapping
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_PROJECTS_VIEW_SUCCESS)
	public DrawProjectsViewResponse drawProjectsView(@Login Integer userId) {
		return projectQueryService.drawProjectsView(userId);
	}
}
