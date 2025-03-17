package com.optiday_min.optiday.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${server.env}")
    private String env;
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String Origins = "";
        if(env.equals("local")){
            Origins = "http://localhost:3000";
        }else{
            Origins = "http://13.209.180.83";
        }

        registry.addMapping("/**") // 모든 엔드포인트에 대해 CORS 허용
                .allowedOrigins(Origins) // React 클라이언트 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(true); // JWT, 쿠키 사용 허용 (필요 시)
    }

}
