package com.optiday_min.optiday.dto;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
public class ProfileUpdate {
    private String username;
    private String message;
    private String email;
    private Integer followers;
    private Integer following;
    private LocalDate birthdate;
    private String phone;
    private String profileImg;
}
