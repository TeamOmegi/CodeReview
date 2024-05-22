package io.omegi.core.project.application.dto.request;

public record CreateServiceTokenRequestDto(
        Integer userId,
        Integer projectId,
        Integer serviceId,
        String name
) {
}