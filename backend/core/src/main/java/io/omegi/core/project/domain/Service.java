package io.omegi.core.project.domain;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "service")
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Service {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer serviceId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "project_id")
	private Project project;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "service_type_id")
	private ServiceType serviceType;

	@OneToOne(fetch = LAZY)
	@JoinColumn(name = "service_token_id")
	private ServiceToken serviceToken;

	@OneToMany(mappedBy = "service")
	private List<ServiceLink> serviceLinks;

	private String name;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	@Builder
	public Service(Project project, ServiceType serviceType, String name) {
		this.project = project;
		this.serviceType = serviceType;
		this.name = name;
	}

	public void registerServiceToken(ServiceToken serviceToken) {
		this.serviceToken = serviceToken;
	}
}
