package io.omegi.core.common.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

import lombok.extern.slf4j.Slf4j;

@Aspect
@Slf4j
public class TraceAspect {

	@Around("execution(* io.omegi.core..*.*(..)) && !execution(* io.omegi.core.common.config..*.*(..))")
	public Object trace(ProceedingJoinPoint joinPoint) throws Throwable {
		Object[] args = joinPoint.getArgs();

		log.info("[[[    method call    ]]] {} args={}", joinPoint.getSignature(), args);
		Object result = joinPoint.proceed();
		log.info("[[[   method return   ]]] {}", joinPoint.getSignature());

		return result;
	}
}
