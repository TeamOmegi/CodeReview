package io.omegi.core.user.persistence.controller;

import io.omegi.core.auth.application.refresh.RefreshTokenService;
import io.omegi.core.auth.jwt.JwtUtil;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.user.application.UserService;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.presentat.model.response.DrawUserProfileResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.DRAW_MY_PROFILE_VIEW_SUCCESS;
import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.LOGOUT_MY_USER_SUCCESS;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    @GetMapping("/profile")
    @ResponseStatus(OK)
    @ResponseWrapping(status = DRAW_MY_PROFILE_VIEW_SUCCESS)
    public DrawUserProfileResponse drawUserProfileResponse(HttpServletRequest request) {
        String accessToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("access".equals(cookie.getName())) {
                    accessToken = cookie.getValue();
                    break;
                }
            }
        }
        if (accessToken == null) {
            throw new RuntimeException("Authorization token is missing or malformed");
        }
        String username = jwtUtil.getUsername(accessToken);
        return userService.drawUserProfile(username);
    }

    @DeleteMapping("/logout")
    @ResponseStatus(OK)
    @ResponseWrapping(status = LOGOUT_MY_USER_SUCCESS)
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }
        System.out.println("로그아웃됨");
        if (refreshToken != null) {
            String username = jwtUtil.getUsername(refreshToken);
            refreshTokenService.deleteRefreshToken(username);
        }
        Cookie accessCookie = new Cookie("access", null);
        accessCookie.setMaxAge(0);
        accessCookie.setPath("/");
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refresh", null);
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");
        response.addCookie(refreshCookie);
    }
}
