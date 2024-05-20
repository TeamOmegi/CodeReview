package io.omegi.core.note.domain;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "link")
@NoArgsConstructor(access = PROTECTED)
public class Link {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer linkId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "note_id")
	private Note note;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "linked_note_id")
	private Note linkedNote;

	@Builder
	private Link(Note note, Note linkedNote) {
		this.note = note;
		this.linkedNote = linkedNote;
	}
}
