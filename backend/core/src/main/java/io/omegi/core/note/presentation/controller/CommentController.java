package io.omegi.core.note.presentation.controller;

import static io.omegi.core.common.presentation.wrapper.WrappedResponseStatus.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.omegi.core.common.annotation.Login;
import io.omegi.core.common.annotation.ResponseWrapping;
import io.omegi.core.note.application.CommentCommandService;
import io.omegi.core.note.application.dto.request.DeleteCommentRequestDto;
import io.omegi.core.note.application.dto.request.EditCommentRequestDto;
import io.omegi.core.note.application.dto.request.RegisterCommentRequestDto;
import io.omegi.core.note.application.dto.response.DeleteCommentResponseDto;
import io.omegi.core.note.application.dto.response.EditCommentResponseDto;
import io.omegi.core.note.application.dto.response.RegisterCommentResponseDto;
import io.omegi.core.note.presentation.model.request.EditCommentRequest;
import io.omegi.core.note.presentation.model.request.RegisterCommentRequest;
import io.omegi.core.note.presentation.model.response.DeleteCommentResponse;
import io.omegi.core.note.presentation.model.response.EditCommentResponse;
import io.omegi.core.note.presentation.model.response.RegisterCommentResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notes/{noteId}/comments")
@RequiredArgsConstructor
public class CommentController {

	private final CommentCommandService commentCommandService;

	@PostMapping
	@ResponseStatus(CREATED)
	@ResponseWrapping(status = SAVE_COMMENT_SUCCESS)
	public RegisterCommentResponse registerComment(@Login Integer userId, @PathVariable Integer noteId,
		@RequestBody RegisterCommentRequest request) {
		RegisterCommentRequestDto requestDto = new RegisterCommentRequestDto(userId, noteId, request.content());
		RegisterCommentResponseDto responseDto = commentCommandService.registerComment(requestDto);
		return new RegisterCommentResponse(responseDto.commentId());
	}

	@PatchMapping("/{commentId}")
	@ResponseStatus(OK)
	@ResponseWrapping(status = EDIT_COMMENT_SUCCESS)
	public EditCommentResponse editComment(@Login Integer userId, @PathVariable Integer noteId,
		@PathVariable Integer commentId, @RequestBody EditCommentRequest request) {
		EditCommentRequestDto requestDto = new EditCommentRequestDto(userId, noteId, commentId, request.content());
		EditCommentResponseDto responseDto = commentCommandService.editComment(requestDto);
		return new EditCommentResponse(responseDto.commentId());
	}

	@DeleteMapping("/{commentId}")
	@ResponseStatus(NO_CONTENT)
	@ResponseWrapping(status = DELETE_COMMENT_SUCCESS)
	public DeleteCommentResponse deleteComment(@Login Integer userId, @PathVariable Integer noteId,
		@PathVariable Integer commentId) {
		DeleteCommentRequestDto requestDto = new DeleteCommentRequestDto(userId, noteId, commentId);
		DeleteCommentResponseDto responseDto = commentCommandService.deleteComment(requestDto);
		return new DeleteCommentResponse(responseDto.commentId());
	}
}
