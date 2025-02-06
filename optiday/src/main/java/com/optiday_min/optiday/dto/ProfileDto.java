package com.optiday_min.optiday.Dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class ProfileDto {
    private String username;
    private String message;
    private String email;
    private Integer followers;
    private Integer following;
    private LocalDate birthday;
    private String phone;
}
