package io.omegi.core.auth.presentation.model.response;

import java.util.Map;

public class GetGithubInfoResponse implements OAuth2Response {
    private final Map<String, Object> attribute;

    public GetGithubInfoResponse(Map<String, Object> attribute) {
        this.attribute = attribute;
    }
    @Override
    public String getProfileImageUrl() {
        if (this.attribute == null || this.attribute.get("avatar_url") == null) {
            return null;
        }
        return this.attribute.get("avatar_url").toString();
    }

    @Override
    public String getUsername() {
        if (this.attribute == null || this.attribute.get("login") == null) {
            return null;
        }
        return (String) this.attribute.get("login");
    }
}
