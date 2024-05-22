package io.omegi.core.auth.application.refresh;



import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Getter
@Builder
@RedisHash("token")
@JsonDeserialize(builder = RefreshEntity.RefreshEntityBuilder.class)
public class RefreshEntity {

    @Id
    private Integer userId;

    private String refresh;

    @TimeToLive
    private long expiration;

    // Lombok이 자동으로 생성하는 빌더 클래스를 위한 설정
    @JsonPOJOBuilder(withPrefix = "")
    public static class RefreshEntityBuilder {
    }
}


