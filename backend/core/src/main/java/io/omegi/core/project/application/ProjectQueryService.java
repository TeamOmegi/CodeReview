package io.omegi.core.project.application;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.project.domain.Project;
import io.omegi.core.project.domain.ServiceLink;
import io.omegi.core.project.persistence.ProjectRepository;
import io.omegi.core.project.presentation.model.response.DrawProjectDetailViewResponse;
import io.omegi.core.project.presentation.model.response.DrawProjectDiagramResponse;
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

	public DrawProjectDetailViewResponse drawProjectDetailView(Integer userId, Integer projectId) {
		Project project = projectRepository.findById(projectId)
			.orElseThrow(RuntimeException::new);

		User user = project.getUser();
		if (!user.getUserId().equals(userId)) {
			throw new AccessDeniedException(userId, null);
		}

		List<DrawProjectDetailViewResponse.ServiceResponse> serviceResponses = project.getServices().stream()
			.map(service -> DrawProjectDetailViewResponse.ServiceResponse.builder()
				.serviceId(service.getServiceId())
				.serviceName(service.getName())
				.build())
			.toList();

		return new DrawProjectDetailViewResponse(projectId, project.getName(), serviceResponses);
	}

	public DrawProjectDiagramResponse drawProjectDiagramView(Integer userId, Integer projectId) {
		Project project = projectRepository.findById(projectId)
			.orElseThrow(RuntimeException::new);

		User user = project.getUser();
		if (!user.getUserId().equals(userId)) {
			throw new AccessDeniedException(userId, null);
		}

		List<io.omegi.core.project.domain.Service> services = project.getServices();

		List<DrawProjectDiagramResponse.NodeResponse> nodes = new ArrayList<>();
		List<DrawProjectDiagramResponse.EdgeResponse> edges = new ArrayList<>();

		for (io.omegi.core.project.domain.Service service : services) {
			DrawProjectDiagramResponse.NodeResponse node = DrawProjectDiagramResponse.NodeResponse.builder()
				.serviceId(service.getServiceId())
				.serviceName(service.getName())
				.serviceImageUrl(service.getServiceType().getImageUrl())
				.build();

			nodes.add(node);

			List<ServiceLink> serviceLinks = service.getServiceLinks();
			for (ServiceLink serviceLink : serviceLinks) {
				io.omegi.core.project.domain.Service linkedService = serviceLink.getLinkedService();
				DrawProjectDiagramResponse.EdgeResponse edge = DrawProjectDiagramResponse.EdgeResponse.builder()
					.source(service.getServiceId())
					.target(linkedService.getServiceId())
					.build();

				edges.add(edge);
			}
		}

		return new DrawProjectDiagramResponse(nodes, edges);
	}
}
