package io.omegi.core.project.persistence;

import io.omegi.core.project.domain.ServiceToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServiceTokenRepository extends JpaRepository<ServiceToken, Integer> {

}