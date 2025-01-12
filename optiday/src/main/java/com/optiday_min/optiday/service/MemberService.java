package com.optiday_min.optiday.service;


import com.optiday_min.optiday.Dto.SignUpRequest;
import com.optiday_min.optiday.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor // 생성자 주입 자동
public class MemberService {



    // 회원가입 (기본값 데이터 추가, 비밀번호 암호화)
    public Member registerMember(SignUpRequest signUpRequest) {
        signUpRequest.setBirthdate(LocalDate.now());
        signUpRequest.setMessage("안녕하세요, "+signUpRequest.getName());
        signUpRequest.setPassword(hashPassword(signUpRequest.getPassword()));
        return signUpRequest.toEntity();
    }

    public String hashPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }





}
