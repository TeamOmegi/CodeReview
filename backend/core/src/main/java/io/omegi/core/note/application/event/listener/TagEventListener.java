package io.omegi.core.note.application.event.listener;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.note.application.TagCommandService;
import io.omegi.core.note.application.dto.request.SaveTagRequestDto;
import io.omegi.core.note.application.event.UnknownTagQueriedEvent;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TagEventListener {

	private final TagCommandService tagCommandService;

	@Transactional
	@EventListener
	public void saveTag(UnknownTagQueriedEvent event) {
		SaveTagRequestDto requestDto = new SaveTagRequestDto(event.tagName());
		tagCommandService.saveTag(requestDto);
	}
}
