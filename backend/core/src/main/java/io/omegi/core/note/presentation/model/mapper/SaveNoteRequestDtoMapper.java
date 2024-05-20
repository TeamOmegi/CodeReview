package io.omegi.core.note.presentation.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import io.omegi.core.note.application.dto.request.SaveNoteRequestDto;
import io.omegi.core.note.presentation.model.request.SaveNoteRequest;

@Mapper
public interface SaveNoteRequestDtoMapper {

	SaveNoteRequestDtoMapper INSTANCE = Mappers.getMapper(SaveNoteRequestDtoMapper.class);

	SaveNoteRequestDto toTarget(SaveNoteRequest request);
}
