//package io.omegi.core.gitNote.presentation.controller;
//
//import io.omegi.core.gitNote.application.GithubService;
//import io.omegi.core.gitNote.application.dto.request.CommitFileRequest;
//import io.omegi.core.gitNote.application.dto.request.CreateRepositoryRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestHeader;
//
//import java.io.IOException;
//
//public class GitNoteController {
//    @Autowired
//    private GithubService githubService;
//
//    @PostMapping("/repositories")
//    public ResponseEntity<Void> createRepository(@RequestHeader("Authorization") String accessToken, @RequestBody CreateRepositoryRequest request) {
//        try {
//            githubService.createRepository(accessToken, request.repositoryName());
//            return ResponseEntity.ok().build();
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    @PostMapping("/repositories/{repositoryName}/commits")
//    public ResponseEntity<Void> commitFile(@RequestHeader("Authorization") String accessToken, @PathVariable String repositoryName, @RequestBody CommitFileRequest request) {
//        try {
//            githubService.commitFile(accessToken, repositoryName, request.filePath(), request.content(), request.commitMessage());
//            return ResponseEntity.ok().build();
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//}
