package io.omegi.core.common.advice;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.common.presentation.wrapper.ResponseWrapper;
import io.omegi.core.common.presentation.wrapper.WrappedResponseStatus;

@RestControllerAdvice
public class ResponseWrapperAdvice implements ResponseBodyAdvice<Object> {

	@Override
	public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
		boolean hasMethodAnnotation = returnType.hasMethodAnnotation(ResponseWrapping.class);

		return hasMethodAnnotation;
	}

	@Override
	public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
		Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request,
		ServerHttpResponse response) {

		ResponseWrapping responseWrapping = returnType.getMethodAnnotation(ResponseWrapping.class);

		WrappedResponseStatus status = responseWrapping.status();

		if (status == WrappedResponseStatus.NULL) {
			int code = responseWrapping.code();
			String message = responseWrapping.message();

			return ResponseWrapper.from(body, code, message);
		}

		return ResponseWrapper.from(body, status);
	}

}
