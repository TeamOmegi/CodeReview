package io.omegi.core.project.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.project.domain.Project;
import io.omegi.core.user.domain.User;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

	Optional<Project> findByUserAndName(User user, String name);

	boolean existsByUserAndName(User user, String name);

	List<Project> findAllByUser(User user);

	Optional<Project> findByUserAndProjectId(User user, Integer projectId);
}
