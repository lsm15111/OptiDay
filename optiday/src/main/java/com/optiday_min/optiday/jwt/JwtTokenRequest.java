package com.optiday_min.optiday.jwt;

import lombok.Data;

@Data
public class JwtTokenRequest {
    private String username;
    private String password;
}
