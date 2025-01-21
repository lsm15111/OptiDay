package com.optiday_min.optiday.Dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class ProfileUpdateRequest {
    private String username;
    private String message;
    private String email;
    private Integer followers;
    private Integer following;
    private LocalDate birthday;
    private String phone;
    private String profileImg;
}
