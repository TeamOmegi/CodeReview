package io.omegi.core.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.omegi.core.common.presentation.sse.SseEmitterManager;

@Configuration
public class SseConfig {

	@Bean
	public SseEmitterManager sseEmitterManager() {
		long defaultTimeout = 60 * 60 * 1000L;
		return new SseEmitterManager(defaultTimeout);
	}
}
