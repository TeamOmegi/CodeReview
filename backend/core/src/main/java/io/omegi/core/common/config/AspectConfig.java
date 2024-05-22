package io.omegi.core.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.omegi.core.common.aspect.TraceAspect;

@Configuration
public class AspectConfig {

	@Bean
	public TraceAspect traceAspect() {
		return new TraceAspect();
	}
}
