package io.omegi.core.project.persistence;

import io.omegi.core.project.domain.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Integer> {
}
