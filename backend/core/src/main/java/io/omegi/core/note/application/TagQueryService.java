package io.omegi.core.note.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.omegi.core.note.domain.Tag;
import io.omegi.core.note.persistence.TagRepository;
import io.omegi.core.note.presentation.model.response.DrawMyTagsViewResponse;
import io.omegi.core.user.domain.User;
import io.omegi.core.user.persistence.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TagQueryService {

	private final TagRepository tagRepository;
	private final UserRepository userRepository;

	public DrawMyTagsViewResponse drawMyTagsView(Integer userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(RuntimeException::new);

		List<Tag> tags = tagRepository.findAllByUser(user);

		List<String> tagNames = tags.stream()
			.map(Tag::getName)
			.toList();

		return new DrawMyTagsViewResponse(tagNames);
	}
}
