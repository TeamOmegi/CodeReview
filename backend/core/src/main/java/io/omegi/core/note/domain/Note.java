package io.omegi.core.note.domain;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import io.omegi.core.project.domain.Error;
import io.omegi.core.user.domain.User;
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
@Table(name = "note")
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Note {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer noteId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	private String title;

	private String content;

	@OneToMany(mappedBy = "note")
	List<NoteTag> noteTags = new ArrayList<>();

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "note_type_id")
	private NoteType noteType;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "note_visibility_id")
	private NoteVisibility noteVisibility;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	private Integer backlinkCount;

	@OneToMany(mappedBy = "note")
	private final List<Link> links = new ArrayList<>();

	@OneToOne(fetch = LAZY, mappedBy = "note") // todo: LAZY not working
	private Error error;

	@Builder
	private Note(User user, String title, String content, NoteType noteType, NoteVisibility noteVisibility) {
		this.user = user;
		this.title = title;
		this.content = content;
		this.noteType = noteType;
		this.noteVisibility = noteVisibility;
		this.backlinkCount = 0;
	}

	public void edit(String title, String content, NoteType noteType, NoteVisibility noteVisibility) {
		this.title = title;
		this.content = content;
		this.noteType = noteType;
		this.noteVisibility = noteVisibility;
	}

	public void linkNote() {
		// todo
		this.backlinkCount++;
	}

	public void unlinkNote() {
		// todo
		this.backlinkCount--;
	}

	public boolean isLinkedTo(Note note) {
		return links.stream()
			.map(Link::getLinkedNote)
			.anyMatch(n -> n.getNoteId().equals(note.getNoteId()));
	}

	public boolean isPublic() {
		return this.noteVisibility.isPublic();
	}
}