package io.omegi.core.auth.application;

import io.omegi.core.auth.Oauth2.CustomOAuth2User;
import io.omegi.core.auth.application.dto.request.GetGithubInfoRequestDto;
import io.omegi.core.auth.presentation.model.response.GetGithubInfoResponse;
import io.omegi.core.auth.presentation.model.response.OAuth2Response;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        System.out.println("oauth2user"+oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("github")) {

            oAuth2Response = new GetGithubInfoResponse(oAuth2User.getAttributes());
        }

        else {

            return null;
        }
//        String username = oAuth2Response.getUsername();
        String username = oAuth2User.getAttribute("login");
        String profileImageUrl = oAuth2User.getAttribute("avatar_url");
//        String profileImageUrl = oAuth2Response.getProfileImageUrl();
        User existData = userRepository.findByUsername(username);

        if (existData == null) {
            User user = User.builder()
                    .username(username)
                    .profileImageUrl(profileImageUrl)
                    .build();
            userRepository.save(user);
//
//            GetGithubInfoRequestDto getGithubInfoRequestDto = new GetGithubInfoRequestDto();
//            getGithubInfoRequestDto.setUsername(username);
//            getGithubInfoRequestDto.setProfileImageUrl(profileImageUrl);
//            return new CustomOAuth2User(getGithubInfoRequestDto);
            GetGithubInfoRequestDto getGithubInfoRequestDto = new GetGithubInfoRequestDto(user.getUserId());
            return new CustomOAuth2User(getGithubInfoRequestDto);
        }
        else {
            GetGithubInfoRequestDto getGithubInfoRequestDto = new GetGithubInfoRequestDto(existData.getUserId());
            return new CustomOAuth2User(getGithubInfoRequestDto);
        }
    }
}

