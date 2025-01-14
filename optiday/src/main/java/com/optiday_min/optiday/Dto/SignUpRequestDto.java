package com.optiday_min.optiday.Dto;

import com.optiday_min.optiday.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class SignUpRequestDto {
    private String name;
    private String password;
    private String email;
    private String phone;

    private LocalDate birthdate; //기본값
    private String message;

    // User 엔티티 객체 생성
    public Member toEntity(){
        return Member.builder()
                .name(this.name)
                .password(this.password)
                .message(this.message)
                .email(this.email)
                .phone(this.phone)
                .birthdate(this.birthdate)
                .build();
    }
}
