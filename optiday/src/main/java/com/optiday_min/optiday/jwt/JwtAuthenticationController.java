package com.optiday_min.optiday.jwt;

import com.optiday_min.optiday.exception.NotAvailableRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/authenticate")
    public JwtTokenResponse authenticate(@RequestBody JwtTokenRequest jwtTokenRequest) {

        if(jwtTokenRequest == null) {
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
//        userDetails.getAuthorities().iterator().next().getAuthority();
        // JWT 토큰 생성
        String token = jwtTokenUtil.generateToken(userDetails);

        return new JwtTokenResponse(token);
    }
}