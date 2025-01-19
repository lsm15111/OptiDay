package com.optiday_min.optiday.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, HandlerMappingIntrospector introspector) throws Exception {

        // h2-console is a servlet
        return httpSecurity
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/authenticate","api/member").permitAll()

                        .requestMatchers(PathRequest.toH2Console()).permitAll() // h2-console is a servlet and NOT recommended for a production
                        .anyRequest().authenticated() // 모든 요청 허용 ** 보안 미적용
                )
                .csrf(AbstractHttpConfigurer::disable) // CSRF 비활성화
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //세션 상태를 Stateless로 설정
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults())) // JWT 인증 설정
                .httpBasic(
                        Customizer.withDefaults()) // 기본인증 활성화
                .headers(header -> header
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)) // Frame-Options Same-Origin 설정(H2 Console 사용 시 필요)
                .cors(Customizer.withDefaults())
                .build();
    }
}

