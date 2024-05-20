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
@Table(name = "note_tag")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class NoteTag {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer noteTagId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "note_id")
	private Note note;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "tag_id")
	private Tag tag;

	@Builder
	private NoteTag(Note note, Tag tag) {
		this.note = note;
		this.tag = tag;
	}
}
