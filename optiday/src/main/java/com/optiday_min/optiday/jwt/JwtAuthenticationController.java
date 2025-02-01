package com.optiday_min.optiday.jwt;

import com.optiday_min.optiday.exception.NotAvailableRequestException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class JwtAuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationController.class);
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/authenticate")
    public JwtTokenResponse authenticate(@RequestBody JwtTokenRequest jwtTokenRequest) {

        if(jwtTokenRequest == null) {
            logger.warn("JWT Token Request Is NULL");
            throw new NotAvailableRequestException();
        }

        // 사용자 인증
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        jwtTokenRequest.getEmail(),
                        jwtTokenRequest.getPassword()
                )
        );

        // User 테이블에 존재하는지 확인
        if(!userService.authenticateUser(jwtTokenRequest)){
            throw new UsernameNotFoundException("Invalid username or password.");
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        // JWT 토큰 생성
        String token = jwtTokenUtil.generateToken(userDetails);
        logger.info("JWT Token Generated Successfully");

        return new JwtTokenResponse(token);
    }
}