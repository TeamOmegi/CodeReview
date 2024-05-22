package io.omegi.core.gitNote.application;

import org.kohsuke.github.GHCreateRepositoryBuilder;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;

import java.io.IOException;

public class GithubService {
    public void createRepository(String accessToken, String repositoryName) throws IOException {
        GitHub github = new GitHubBuilder().withOAuthToken(accessToken).build();
        GHCreateRepositoryBuilder repositoryBuilder = github.createRepository(repositoryName);
        repositoryBuilder.private_(false).create();
    }

    public void commitFile(String accessToken, String repositoryName, String filePath, String content, String commitMessage) throws IOException {
        GitHub github = new GitHubBuilder().withOAuthToken(accessToken).build();
        GHRepository repository = github.getRepository(repositoryName);
        repository.createContent()
                .content(content)
                .message(commitMessage)
                .path(filePath)
                .commit();
    }
}
