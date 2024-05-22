package io.omegi.core.user.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.user.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByUserId(Integer userId);
}
