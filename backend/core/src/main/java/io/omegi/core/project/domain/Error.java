package io.omegi.core.project.domain;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import io.omegi.core.note.domain.Note;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "error")
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Error {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer errorId;

	@OneToOne(fetch = LAZY)
	@JoinColumn(name = "note_id")
	private Note note;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "service_id")
	private Service service;

	private String type;

	private String summary;

	private LocalDateTime time;

	private boolean solved;

	private String mongoId;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	public void solve() {
		this.solved = true;
	}
}
