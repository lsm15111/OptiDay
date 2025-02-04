package com.optiday_min.optiday.jwt;

import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.exception.NotAvailableRequestException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;


    // 회원 권한 등록
    public User registerUser(String email, String password,Member member) {

        if(userRepository.existsByEmail(email)){
            logger.warn("User with email {} already exists", email);
            throw new NotAvailableRequestException();
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setMember(member);

        // 기본 권한 추가 (예: ROLE_USER)
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRoles(Collections.singleton(userRole));

        logger.info("Registering user " + user.getEmail());
        return userRepository.save(user);
    }

    public String getEmailByMemberId(Long memberId) {
        User user = userRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getEmail();
    }

    public boolean authenticateUser(JwtTokenRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        // 복호화 == 암호화 비교
        if(passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            logger.info("Authenticated user " + user.getEmail());
            return true;
        }
        logger.warn("Invalid username or password");
        return false;
    }

    // Token -> MemberId 반환
    public Long getMemberIdForToken(String token) {
        try {
            // 토큰 추출
            token = jwtTokenUtil.extractToken(token);
            // JWT 파싱 및 검증
            Long memberId = jwtTokenUtil.getMemberId(token);
            logger.info("JWT Valid! MemberId : " + memberId);
            return memberId;
        } catch (Exception e) {
            logger.warn("Invalid token");
            throw new NotAvailableRequestException();
        }
    }

    public boolean isEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
