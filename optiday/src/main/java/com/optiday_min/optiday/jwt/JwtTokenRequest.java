package com.optiday_min.optiday.jwt;

import lombok.Data;

@Data
public class JwtTokenRequest {
    private String email;
    private String password;
}
