package io.omegi.core.project.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;

@Document(collection = "error_log")
@Getter
public class ErrorLog {

	@Id
	private String errorLogId;

	@Field("error_type")
	private String errorType;

	@Field("log")
	private String log;

	@Field("project_id")
	private Integer projectId;

	@Field("service_id")
	private Integer serviceId;

	@Field("summary")
	private String summary;

	@Field("time")
	private LocalDateTime time;

	@Field("trace")
	private List<Trace> traces;

	@Getter
	public static class Trace {

		@Field("span_id")
		private String spanId;

		@Field("service_name")
		private String serviceName;

		@Field("name")
		private String name;

		@Field("parent_span_id")
		private String parentSpanId;

		@Field("kind")
		private String kind;

		@Field("attributes")
		private Map<String, Object> attributes;

		@Field("enter_time")
		private LocalDateTime enterTime;

		@Field("exit_time")
		private LocalDateTime exitTime;
	}
}
