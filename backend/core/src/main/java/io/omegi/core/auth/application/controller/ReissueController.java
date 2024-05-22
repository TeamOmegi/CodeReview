package io.omegi.core.auth.application.controller;

import io.omegi.core.auth.application.refresh.RefreshEntity;
import io.omegi.core.auth.application.refresh.RefreshTokenService;
import io.omegi.core.auth.jwt.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;

@Controller
@ResponseBody
public class ReissueController {
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    @Autowired
    public ReissueController(JwtUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        String access = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            access = Arrays.stream(cookies)
                    .filter(cookie -> "access".equals(cookie.getName()))
                    .findFirst()
                    .map(Cookie::getValue)
                    .orElse(null);
        }
        System.out.println();

        if (access == null) {
            return new ResponseEntity<>("access token null", HttpStatus.BAD_REQUEST);
        }
//        String username = jwtUtil.getUsername(refresh);
//        RefreshEntity storedToken = refreshTokenService.getRefreshToken(username);
//        String username = jwtUtil.getUsername(access);
        Integer userId = jwtUtil.getUserId(access);
        RefreshEntity storedToken = refreshTokenService.getRefreshToken(userId);

        System.out.println(storedToken);

        if (storedToken == null) {
            return new ResponseEntity<>("refresh token not found or expired", HttpStatus.BAD_REQUEST);
        }
        if (System.currentTimeMillis() > storedToken.getExpiration() * 1000) {
            return new ResponseEntity<>("refresh token expired", HttpStatus.UNAUTHORIZED);
        }

//        String category = jwtUtil.getCategory(refresh);
//
//        if (!category.equals("refresh")) {
//            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
//        }

//        String username = jwtUtil.getUsername(refresh);
        String newAccess = jwtUtil.createJwt("access", userId, 24 * 60 * 60 * 1000L);
        String newRefresh = jwtUtil.createJwt("refresh", userId, 2 * 24 * 60 * 60 * 1000L);
//
        refreshTokenService.deleteRefreshToken(userId); // 기존 토큰 삭제
        System.out.println("삭제되니");
        System.out.println(newAccess);
        refreshTokenService.storeRefreshToken(userId, newRefresh, 300L); // 새 토큰 저장
        response.addCookie(createCookie("access", newAccess));
//        response.addCookie(createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
    }
    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        if ("access".equals(key)) {
            cookie.setMaxAge(24 * 60 * 60);
        }
//        else if ("refresh".equals(key)) {
//            cookie.setMaxAge(2 * 24 * 60 * 60);
//        }
        return cookie;
    }
}
