package io.omegi.core.auth.Oauth2;

import io.omegi.core.auth.application.refresh.RefreshTokenService;
import io.omegi.core.auth.jwt.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Value("${front-url}")
    private String frontUrl;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    public CustomSuccessHandler(JwtUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

//        String username = customUserDetails.getName();
        Integer userId = Integer.parseInt(customUserDetails.getName());
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        System.out.println("여기까지 옴");


        String access = jwtUtil.createJwt("access", userId, 24 * 60 * 60 * 1000L);
        String refresh = jwtUtil.createJwt("refresh", userId, 2 * 24 * 60 * 60 * 1000L);
        refreshTokenService.deleteRefreshToken(userId);
        System.out.println(access);
        System.out.println(refresh);
        refreshTokenService.storeRefreshToken(userId, refresh, 2 * 24 * 60 * 60 * 1000L);  // Store refresh token in Redis
        response.addCookie(createCookie("access", access));
//        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
        response.sendRedirect(frontUrl);
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        if ("access".equals(key)) {
            cookie.setMaxAge(24 * 60 * 60); // 유효 기간을 하루로 설정
//            cookie.setMaxAge(180); // 유효 기간을 하루로 설정
        }
//        else if ("refresh".equals(key)) {
//            cookie.setMaxAge(2 * 24 * 60 * 60); // 유효 기간을 3일로 설정
////            cookie.setMaxAge(300);
//        }
//        cookie.setSecure(true); // HTTPS를 통해서만 쿠키를 전송하도록 설정
        cookie.setPath("/"); // 쿠키의 유효 경로를 루트로 설정
//        cookie.setHttpOnly(true); // JavaScript를 통해 쿠키에 접근하지 못하도록 설정

        return cookie;
    }


}

