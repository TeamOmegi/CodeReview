package io.omegi.core.common.exception;

public class SseFailedException extends RuntimeException {

	public SseFailedException() {
		super();
	}

	public SseFailedException(String message) {
		super(message);
	}

	public SseFailedException(String message, Throwable cause) {
		super(message, cause);
	}

	public SseFailedException(Throwable cause) {
		super(cause);
	}

	protected SseFailedException(String message, Throwable cause, boolean enableSuppression,
		boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
}
