package io.omegi.core.note.presentation.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import io.omegi.core.note.application.dto.request.EditNoteRequestDto;
import io.omegi.core.note.presentation.model.request.EditNoteRequest;

@Mapper
public interface EditNoteRequestDtoMapper {

	EditNoteRequestDtoMapper INSTANCE = Mappers.getMapper(EditNoteRequestDtoMapper.class);

	@Mapping(source = "tags", target = "tagNames")
	@Mapping(source = "type", target = "noteType")
	@Mapping(source = "visibility", target = "noteVisibility")
	@Mapping(source = "links", target = "linkedNoteIds")
	EditNoteRequestDto toTarget(EditNoteRequest request);

}

