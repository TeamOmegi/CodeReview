package io.omegi.core.project.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;

import io.omegi.core.project.domain.ErrorLog;

public interface ErrorLogRepository extends MongoRepository<ErrorLog, String> {
}
