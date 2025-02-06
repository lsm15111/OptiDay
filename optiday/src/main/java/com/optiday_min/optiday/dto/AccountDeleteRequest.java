package com.optiday_min.optiday.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDeleteRequest {
    private String email;
    private String password;
}
