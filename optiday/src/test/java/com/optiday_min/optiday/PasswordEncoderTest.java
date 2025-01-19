package com.optiday_min.optiday;

import com.optiday_min.optiday.service.MemberService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PasswordEncoderTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Test
    @DisplayName("패스워드 암호화 테스트")
    void passwordEncode() {
        //given
        String rawPassword = "123456";
        //when
        String encodedPassword = passwordEncoder.encode(rawPassword);
        //then
        assertAll(
                () -> assertNotEquals(rawPassword, encodedPassword,"encoded != raw (not match error)"),
                () -> assertTrue(passwordEncoder.matches(rawPassword,encodedPassword),"password should match after encoding")
        );

    }
}
