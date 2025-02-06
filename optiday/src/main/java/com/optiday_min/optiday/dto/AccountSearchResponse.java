package com.optiday_min.optiday.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AccountSearchResponse {
    private Long id;
    private String username;
    private String email;
}
