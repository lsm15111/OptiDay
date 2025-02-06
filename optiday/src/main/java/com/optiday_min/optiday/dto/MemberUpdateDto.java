package com.optiday_min.optiday.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberUpdateDto {

    private String username;
    private String message;
    private LocalDate birthdate;
    private String email;
    private String phone;

}
