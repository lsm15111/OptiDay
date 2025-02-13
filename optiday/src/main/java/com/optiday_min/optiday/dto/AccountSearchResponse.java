package com.optiday_min.optiday.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class AccountSearchResponse {
    private Long id;
    private String username;
    private String email;
}
