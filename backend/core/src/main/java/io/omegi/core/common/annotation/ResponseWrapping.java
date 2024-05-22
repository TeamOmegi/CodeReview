package io.omegi.core.common.annotation;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.omegi.core.common.presentation.wrapper.WrappedResponseStatus;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ResponseWrapping {

	int code() default 5000;

	String message() default "";

	WrappedResponseStatus status() default NULL;
}
