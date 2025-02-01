package com.optiday_min.optiday.jwt;

import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.exception.NotAvailableRequestException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    // 회원 권한 등록
    public User registerUser(String email, String password,Member member) {
        User user = new User();
        user.setUsername(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setMember(member);

        // 기본 권한 추가 (예: ROLE_USER)
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRoles(Collections.singleton(userRole));

        return userRepository.save(user);
    }

    public boolean authenticateUser(JwtTokenRequest request) {
        User user = userRepository.findByUsername(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        // 복호화 == 암호화 비교
        if(passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return true;
        }
        return false;
    }

    // Token -> MemberId 반환
    public Long getMemberIdForToken(String token) {
        try {
            // 토큰 추출
            token = jwtTokenUtil.extractToken(token);
            // JWT 파싱 및 검증
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
            System.out.println("JWT 유효함! 사용자: " + claims.getSubject());
            Optional<User> user = userRepository.findByUsername(claims.getSubject());

            return user.get().getMember().getId();
        } catch (Exception e) {
            throw new NotAvailableRequestException();
        }
    }
}
