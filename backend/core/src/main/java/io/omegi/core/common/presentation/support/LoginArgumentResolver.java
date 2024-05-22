package io.omegi.core.common.presentation.support;

import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import io.omegi.core.auth.Oauth2.CustomOAuth2User;
import io.omegi.core.common.annotation.Login;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoginArgumentResolver implements HandlerMethodArgumentResolver {

	private final Integer userId;

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		boolean hasAnnotation = parameter.hasParameterAnnotation(Login.class);
		boolean isAssignable = Integer.class.isAssignableFrom(parameter.getParameterType());

		return hasAnnotation && isAssignable;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
		NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

		// Login login = parameter.getParameterAnnotation(Login.class);

		// Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// CustomOAuth2User principal = (CustomOAuth2User)authentication.getPrincipal();
		//
		// return principal.getUserId();

		return userId;
	}
}
