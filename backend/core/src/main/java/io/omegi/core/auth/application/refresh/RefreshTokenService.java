package io.omegi.core.auth.application.refresh;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RefreshTokenService {

    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenService.class);

    @Autowired
    private RedisTemplate<String, RefreshEntity> redisTemplate;

    public void storeRefreshToken(Integer userId, String refreshToken, long durationInMillis) {
        String userKey = String.valueOf(userId); // Integer to String conversion
        long expirationTimestamp = System.currentTimeMillis() + durationInMillis;

        RefreshEntity refreshEntity = RefreshEntity.builder()
                .userId(userId)
                .refresh(refreshToken)
                .expiration(expirationTimestamp)
                .build();

        redisTemplate.opsForValue().set(userKey, refreshEntity, durationInMillis, TimeUnit.MILLISECONDS);

        logger.debug("Stored refresh token for user: {}, token: {}, expires at: {}", userId, refreshToken, expirationTimestamp);
    }
    public RefreshEntity getRefreshToken(Integer userId) {
        String userKey = String.valueOf(userId);
        RefreshEntity refreshEntity = redisTemplate.opsForValue().get(userKey);

        return refreshEntity;
    }

    public void deleteRefreshToken(Integer userId) {
        String userKey = String.valueOf(userId);
        redisTemplate.delete(userKey);
    }
}
