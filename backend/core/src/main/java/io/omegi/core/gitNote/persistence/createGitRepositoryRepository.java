//package io.omegi.core.gitNote.persistence;
//
//import org.kohsuke.github.GHCreateRepositoryBuilder;
//import org.kohsuke.github.GitHub;
//import org.kohsuke.github.GitHubBuilder;
//
//public interface createGitRepositoryRepository {
//    public void createRepository(String accessToken, String repositoryName) throws IOException {
//        GitHub github = new GitHubBuilder().withOAuthToken(accessToken).build();
//        GHCreateRepositoryBuilder repositoryBuilder = github.createRepository(repositoryName);
//        repositoryBuilder.private_(false).create();
//    }
//}
