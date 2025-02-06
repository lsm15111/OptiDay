package com.optiday_min.optiday.dto;

import com.optiday_min.optiday.entity.Member;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class SignUpRequest {
    @NotBlank(message = "이름은 필수 입력 항목입니다.")
    @Size(min = 2, max = 10, message="이름은 2~10자 사이여야 합니다.")
    private String username;

    @Size(min = 6, max = 20, message = "비밀번호는 6~20자 사이여야 합니다.")
    private String password;

    @Email(message = "유효한 이메일 형식이어야 합니다.")
    private String email;

    private String phone;

    private LocalDate birthdate; //기본값
    private String message;

    // User 엔티티 객체 생성
    public Member toEntity(){
        return Member.builder()
                .username(this.username)
                .message(this.message)
                .phone(this.phone)
                .birthdate(this.birthdate)
                .build();
    }
}
