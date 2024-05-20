package io.omegi.core.common.advice;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.common.exception.AccessDeniedException;
import io.omegi.core.common.exception.response.AccessDeniedExceptionResponse;
import io.omegi.core.common.exception.response.RuntimeExceptionResponse;

@RestControllerAdvice
public class CommonExceptionHandlerAdvice {

	@ExceptionHandler(RuntimeException.class)
	@ResponseStatus(BAD_REQUEST)
	@ResponseWrapping(status = CLIENT_ERROR)
	public RuntimeExceptionResponse handleRuntimeException(RuntimeException e) {
		return new RuntimeExceptionResponse(e.getMessage());
	}

	@ExceptionHandler(AccessDeniedException.class)
	@ResponseStatus(FORBIDDEN)
	@ResponseWrapping(status = ACCESS_DENIED)
	public AccessDeniedExceptionResponse handleAccessDeniedException(AccessDeniedException e) {
		return new AccessDeniedExceptionResponse(e.getAccessorId(), e.getMessage());
	}
}
