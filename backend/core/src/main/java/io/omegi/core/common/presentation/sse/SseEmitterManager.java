package io.omegi.core.common.presentation.sse;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import io.omegi.core.common.exception.SseFailedException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SseEmitterManager {

	private static final String initialEventName = "connection event";
	private static final String initialEventData = "connection established";

	private final Map<Integer, SseEmitter> sseEmitterStore = new ConcurrentHashMap<>();
	private final long defaultTimeout;

	public SseEmitter create(Integer sseEmitterId) {
		SseEmitter sseEmitter = new SseEmitter(defaultTimeout);

		Runnable callback = () -> remove(sseEmitterId);
		sseEmitter.onTimeout(callback);
		sseEmitter.onCompletion(callback);
		// sseEmitter.onError();

		sendEvent(sseEmitter, "temp id", initialEventName, initialEventData);
		sseEmitterStore.put(sseEmitterId, sseEmitter);

		return sseEmitter;
	}

	private SseEmitter get(Integer sseEmitterId) {
		return sseEmitterStore.get(sseEmitterId);
	}

	private SseEmitter remove(Integer sseEmitterId) {
		return sseEmitterStore.remove(sseEmitterId);
	}

	public void complete(Integer sseEmitterId) {
		SseEmitter sseEmitter = remove(sseEmitterId);
		sseEmitter.complete();
	}

	public void sendEvent(Integer sseEmitterId, String id, String name, Object data) {
		SseEmitter sseEmitter = get(sseEmitterId);
		sendEvent(sseEmitter, id, name, data);
	}

	private void sendEvent(SseEmitter sseEmitter, String id, String name, Object data) {
		try {
			sseEmitter.send(SseEmitter.event()
				.id(id)
				.name(name)
				.data(data));
		} catch (IOException e) {
			throw new SseFailedException(e.getMessage(), e.getCause());
		}
	}
}
