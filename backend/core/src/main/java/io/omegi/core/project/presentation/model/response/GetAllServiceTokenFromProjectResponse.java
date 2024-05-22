package io.omegi.core.project.presentation.model.response;
import lombok.Builder;
import java.util.List;
public record GetAllServiceTokenFromProjectResponse(
        List<ServiceTokenResponse> serviceTokens
) {
    @Builder
    public record ServiceTokenResponse(
            Integer serviceId,
            String serviceToken
    ) {
    }
}