package io.omegi.core.auth.presentation.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetGithubInfoRequest {
    private String username;
    private String profileImageUrl;
}
