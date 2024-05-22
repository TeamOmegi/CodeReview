package io.omegi.core.auth.Oauth2;

import io.omegi.core.auth.application.dto.request.GetGithubInfoRequestDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final GetGithubInfoRequestDto getGithubInfoRequestDto;

    public CustomOAuth2User(GetGithubInfoRequestDto getGithubInfoRequestDto) {

        this.getGithubInfoRequestDto = getGithubInfoRequestDto;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return String.valueOf(getGithubInfoRequestDto.userId());
    }

//    public String getProfileImageUrl() {
//        return getGithubInfoRequestDto.getProfileImageUrl();
//    }
}

