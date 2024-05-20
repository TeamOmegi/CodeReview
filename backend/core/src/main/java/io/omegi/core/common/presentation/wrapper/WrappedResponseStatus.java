package io.omegi.core.common.presentation.wrapper;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum WrappedResponseStatus {

	NULL(0, ""),

	SUCCESS(2000, "Process Success"),
	CLIENT_ERROR(4000, "Client Error"),
	SERVER_ERROR(5000, "Server Error"),

	DRAW_MY_NOTE_DETAIL_VIEW_SUCCESS(2001,"my note detail view is successfully drawn"),
	DRAW_MY_NOTE_LIST_VIEW_SUCCESS(2002, "my note list view is successfully drawn"),
	DRAW_MY_NOTE_GRAPH_VIEW_SUCCESS(2003, "my note graph view is successfully drawn"),
	DRAW_ALL_NOTE_LIST_VIEW_SUCCESS(2004, "all note list view is successfully drawn"),
	DRAW_ALL_NOTE_DETAIL_VIEW_SUCCESS(2005, "all note detail view is successfully drawn"),
	DRAW_NOTE_SUMMARY_VIEW_SUCCESS(2006, "note summary view is successfully drawn"),
	DRAW_COMMENTS_VIEW_SUCCESS(2007, "comments view is successfully drawn"),
	DRAW_MY_TAGS_VIEW_SUCCESS(2008, "my tags view is successfully drawn"),
	DRAW_ERROR_DETAIL_VIEW_SUCCESS(2009, "error detail view is successfully drawn"),
	DRAW_ERRORS_VIEW_SUCCESS(2010, "errors view is successfully drawn"),
	DRAW_ERROR_SUMMARY_VIEW_SUCCESS(2011, "error summary view is successfully drawn"),
	DRAW_IS_LINKED_VIEW_SUCCESS(2012, "is linked view is successfully drawn"),
	DRAW_PROJECTS_VIEW_SUCCESS(2013, "projects view is successfully drawn"),

	SAVE_NOTE_SUCCESS(2101, "note is successfully saved"),
	EDIT_NOTE_SUCCESS(2102, "note is successfully edited"),
	DELETE_NOTE_SUCCESS(2103, "note is successfully deleted"),
	LINK_NOTE_SUCCESS(2104, "notes are successfully linked"),
	UNLINK_NOTE_SUCCESS(2105, "notes are successfully unlinked"),
	SAVE_COMMENT_SUCCESS(2106, "comment is successfully created"),
	EDIT_COMMENT_SUCCESS(2107, "comment is successfully edited"),
	DELETE_COMMENT_SUCCESS(2108, "comment is successfully deleted"),
	SAVE_PROJECT_SUCCESS(2109, "project is successfully created"),
	EDIT_PROJECT_SUCCESS(2110, "project is successfully edited"),
	DELETE_PROJECT_SUCCESS(2111, "project is successfully deleted"),
	MARK_ERROR_SOLVED_SUCCESS(2112, "error is successfully marked as solved"),

	ACCESS_DENIED(4003, "access denied");

	private final int code;
	private final String message;
}
