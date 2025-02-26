package com.optiday_min.optiday.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDeleteRequest {
    @NotBlank(message = "이메일은 필수 입력값 입니다")
    @Email(message = "이메일 형식이어야 합니다")
    private String email;
    @NotBlank(message = "비밀번호는 필수 입력값 입니다")
    private String password;
}
