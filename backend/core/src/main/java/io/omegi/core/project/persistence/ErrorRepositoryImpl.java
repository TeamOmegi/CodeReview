package io.omegi.core.project.persistence;

import java.util.List;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import io.omegi.core.project.domain.Error;
import io.omegi.core.project.domain.QError;
import io.omegi.core.project.domain.QProject;
import io.omegi.core.project.domain.QService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ErrorRepositoryImpl implements CustomErrorRepository{

	private final JPAQueryFactory queryFactory;

	@Override
	public List<Error> searchErrors(String projectName, String serviceName, Boolean solved, String errorType) {
		QError error = QError.error;
		QService service = QService.service;
		QProject project = QProject.project;

		BooleanExpression serviceNameEq = serviceName == null ? null : error.service.name.eq(serviceName);
		BooleanExpression solvedEq = solved == null ? null : error.solved.eq(solved);
		BooleanExpression errorTypeEq = errorType == null ? null : error.type.eq(errorType);

		return queryFactory.selectFrom(error)
			.join(error.service, service)
			.join(service.project, project)
			.on(project.name.eq(projectName))
			.where(serviceNameEq, solvedEq, errorTypeEq)
			.orderBy(error.createdAt.desc())
			.fetch();
	}
}
