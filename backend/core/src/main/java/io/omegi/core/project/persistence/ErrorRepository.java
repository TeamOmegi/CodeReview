package io.omegi.core.project.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.omegi.core.project.domain.Error;
import io.omegi.core.user.domain.User;

public interface ErrorRepository extends JpaRepository<Error, Integer>, CustomErrorRepository {

	@Query("select count(e) from Error e join e.service s join s.project p join p.user u where u = :user and e.solved = :solved")
	int countByUserAndSolved(@Param("user") User user, @Param("solved") boolean solved);

	@Query("select e from Error e join e.service s join s.project p join p.user u where u = :user order by e.createdAt desc limit 1")
	Optional<Error> findTopByUserOrderByCreatedAt(@Param("user") User user);

	@Query("select e from Error e join e.service s join s.project p join p.user u where u = :user and e.solved = false order by e.createdAt desc")
	List<Error> findUnsolvedErrors(@Param("user") User user);
}
