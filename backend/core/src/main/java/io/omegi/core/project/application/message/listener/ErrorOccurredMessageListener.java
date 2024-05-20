package io.omegi.core.project.application.message.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import io.omegi.core.project.application.event.ErrorOccurredEvent;
import io.omegi.core.project.application.message.ErrorOccurredMessage;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ErrorOccurredMessageListener {

	private final ApplicationEventPublisher eventPublisher;

	@RabbitListener(queues = "${rabbitmq.queue.name}")
	public void consume(ErrorOccurredMessage message) {
		eventPublisher.publishEvent(new ErrorOccurredEvent(message.errorId()));
	}
}
