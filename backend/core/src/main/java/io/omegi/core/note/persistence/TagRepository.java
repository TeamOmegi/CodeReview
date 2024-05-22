package io.omegi.core.note.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.omegi.core.note.domain.Tag;
import io.omegi.core.user.domain.User;

public interface TagRepository extends JpaRepository<Tag, Integer> {

	Optional<Tag> findByName(String name);

	boolean existsByName(String name);

	@Query("select distinct t from NoteTag nt join nt.tag t join nt.note n where n.user = :user order by t.name asc")
	List<Tag> findAllByUser(@Param("user") User user);
}
