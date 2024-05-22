package io.omegi.core.project.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.project.domain.ServiceLink;

public interface ServiceLinkRepository extends JpaRepository<ServiceLink, Integer> {
}
