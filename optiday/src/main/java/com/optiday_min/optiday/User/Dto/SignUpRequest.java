package com.optiday_min.optiday.User.Dto;

import com.optiday_min.optiday.User.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class SignUpRequest {
    private String name;
    private String password;
    private String email;
    private String phone;

    private LocalDate birthday=null; //기본값
    private String message="";

    // User 엔티티 객체 생성
    public User toEntity(){
        return User.builder()
                .name(this.name)
                .password(this.password)
                .message(this.message)
                .email(this.email)
                .phone(this.phone)
                .birthday(this.birthday)
                .build();
    }

}
