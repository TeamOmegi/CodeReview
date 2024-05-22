package io.omegi.core.project.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import io.omegi.core.project.domain.ServiceType;

public interface ServiceTypeRepository extends JpaRepository<ServiceType, Integer> {
}
