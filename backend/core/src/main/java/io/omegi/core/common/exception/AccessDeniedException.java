package io.omegi.core.common.exception;

import lombok.Getter;

public class AccessDeniedException extends RuntimeException {

	@Getter
	private Integer accessorId;

	public AccessDeniedException() {
		super();
	}

	public AccessDeniedException(String message) {
		super(message);
	}

	public AccessDeniedException(String message, Throwable cause) {
		super(message, cause);
	}

	public AccessDeniedException(Throwable cause) {
		super(cause);
	}

	protected AccessDeniedException(String message, Throwable cause, boolean enableSuppression,
		boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public AccessDeniedException(Integer accessorId, String message) {
		this(message);
		this.accessorId = accessorId;
	}
}
