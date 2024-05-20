package io.omegi.core.project.domain;

import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "service_type")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class ServiceType {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Integer serviceTypeId;

	private String name;

	private String image_url;
}
