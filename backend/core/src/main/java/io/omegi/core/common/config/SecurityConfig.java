package io.omegi.core.common.config;

import java.util.List;

import io.omegi.core.auth.Oauth2.CustomSuccessHandler;
import io.omegi.core.auth.application.CustomOAuth2UserService;
import io.omegi.core.auth.jwt.JwtFilter;
import io.omegi.core.auth.jwt.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final CustomOAuth2UserService customOAuth2UserService;
	private final CustomSuccessHandler customSuccessHandler;
	private final JwtUtil jwtUtil;
	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, CustomSuccessHandler customSuccessHandler, JwtUtil jwtUtil) {
		this.customOAuth2UserService = customOAuth2UserService;
		this.customSuccessHandler = customSuccessHandler;
		this.jwtUtil = jwtUtil;
	}
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
				.csrf((auth) -> auth.disable());

		http
				.formLogin((auth) -> auth.disable());

		http
				.httpBasic((auth) -> auth.disable());

		// http
		// 		.addFilterAfter(new JwtFilter(jwtUtil), OAuth2LoginAuthenticationFilter.class);
		//
		// http
		// 		.addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

		// http
		// 		.oauth2Login((oauth2) -> oauth2
		// 				.userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
		// 						.userService(customOAuth2UserService))
		// 				.successHandler(customSuccessHandler)
		// 		);
		//
		// http
		// 		.authorizeHttpRequests((auth) -> auth
		// 				.requestMatchers("/").permitAll()
		// 				.requestMatchers("/reissue").permitAll()
		// 				.requestMatchers("/users/profile").permitAll()
		// 				.anyRequest().authenticated());
		http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

		http
				.sessionManagement((session) -> session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http
				.cors(cors -> {
					cors.configurationSource(corsConfigurationSource());
				});

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowCredentials(true);
		configuration.setAllowedOriginPatterns(List.of("*"));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setExposedHeaders(List.of("*"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}
