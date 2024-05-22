package io.omegi.core.user.domain;

import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import io.omegi.core.note.domain.Note;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
public class User {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer userId;

	private String username;

	private String repositoryToken;
	private String repositoryUrl;
	private String profileImageUrl;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	private boolean deleted;

	@OneToMany(mappedBy = "user")
	private List<Note> notes = new ArrayList<>();

	public User(Integer userId, String username, String repositoryToken, String repositoryUrl, String profileImageUrl, LocalDateTime createdAt, LocalDateTime updatedAt, boolean deleted, List<Note> notes) {
		this.userId = userId;
		this.username = username;
		this.repositoryToken = repositoryToken;
		this.repositoryUrl = repositoryUrl;
		this.profileImageUrl = profileImageUrl;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.deleted = deleted;
		this.notes = notes;
	}
}
