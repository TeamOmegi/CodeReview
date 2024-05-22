package io.omegi.core.auth.presentation.model.response;



    public record CreateAccessTokenResponse(
            String username,
            String refresh
    ) {
    }

