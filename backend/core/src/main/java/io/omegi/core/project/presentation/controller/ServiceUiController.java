package io.omegi.core.project.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.project.application.ServiceQueryService;
import io.omegi.core.project.presentation.model.response.DrawSupportedServiceTypesViewResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceUiController {

	private final ServiceQueryService serviceQueryService;

	@GetMapping("/supported-types")
	@ResponseStatus(OK)
	@ResponseWrapping(status = DRAW_SUPPORTED_SERVICE_TYPE_VIEW_SUCCESS)
	public DrawSupportedServiceTypesViewResponse drawSupportedServiceTypesView() {
		return serviceQueryService.drawSupportedServiceTypesView();
	}
}
