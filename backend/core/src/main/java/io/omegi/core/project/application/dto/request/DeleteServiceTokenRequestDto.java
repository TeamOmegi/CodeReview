package io.omegi.core.project.application.dto.request;

public record DeleteServiceTokenRequestDto(
        Integer userId,

        Integer serviceId,

        Integer serviceTokenId

        ) {
}
