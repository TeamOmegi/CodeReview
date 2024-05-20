package io.omegi.core.note.domain;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "note_type")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class NoteType {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer noteTypeId;

	@Enumerated(STRING)
	private Type type;
}
