package io.omegi.core.common.presentation.wrapper;

import static lombok.AccessLevel.*;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class ResponseWrapper<T> {

	private final int code;
	private final String message;
	private final T response;

	public static <T> ResponseWrapper<T> from(T response, WrappedResponseStatus status) {
		return new ResponseWrapper<>(status.getCode(), status.getMessage(), response);
	}

	public static <T> ResponseWrapper<T> from(T response, int code, String message) {
		return new ResponseWrapper<>(code, message, response);
	}
}
