package io.omegi.core.gitNote.application.dto.request;

public record CommitFileRequest (
        String filePath,
        String content,
        String commitMessage
){
}
