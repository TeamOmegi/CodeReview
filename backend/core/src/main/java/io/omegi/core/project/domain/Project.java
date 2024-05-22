package io.omegi.core.project.domain;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.util.StringUtils;

import io.omegi.core.user.domain.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "project")
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Project {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer projectId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	private String name;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	@OneToMany(mappedBy = "project", cascade = ALL)
	private final List<Service> services = new ArrayList<>();

	@Builder
	private Project(User user, String name) {
		this.user = user;
		this.name = name;
	}

	public void addService(Service service) {
		this.services.add(service);
	}

	public void editName(String name) {
		if (!StringUtils.hasText(name)) {
			throw new RuntimeException(); // todo
		}

		this.name = name;
	}
}
