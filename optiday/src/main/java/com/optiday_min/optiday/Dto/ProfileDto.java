package com.optiday_min.optiday.Dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class ProfileDto {
    private String name;
    private String message;
    private String email;
    private int followers;
    private int following;
    private LocalDate birthday;
    private String phone;
}
