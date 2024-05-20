package io.omegi.core.note.domain;

import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tag")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Tag {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer tagId;

	private String name;

	@Builder
	private Tag(String name) {
		this.name = name;
	}
}
