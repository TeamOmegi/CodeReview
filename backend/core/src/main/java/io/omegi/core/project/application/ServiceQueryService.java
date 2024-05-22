package io.omegi.core.project.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.project.domain.ServiceType;
import io.omegi.core.project.persistence.ServiceTypeRepository;
import io.omegi.core.project.presentation.model.response.DrawSupportedServiceTypesViewResponse;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ServiceQueryService {

	private final ServiceTypeRepository serviceTypeRepository;

	public DrawSupportedServiceTypesViewResponse drawSupportedServiceTypesView() {
		List<ServiceType> serviceTypes = serviceTypeRepository.findAll();
		List<DrawSupportedServiceTypesViewResponse.SupportedTypeResponse> supportedTypeResponses = serviceTypes.stream()
			.map(serviceType -> DrawSupportedServiceTypesViewResponse.SupportedTypeResponse.builder()
				.serviceTypeId(serviceType.getServiceTypeId())
				.serviceTypeName(serviceType.getName())
				.build())
			.toList();

		return new DrawSupportedServiceTypesViewResponse(supportedTypeResponses);
	}
}
