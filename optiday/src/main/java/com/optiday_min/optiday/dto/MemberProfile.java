package com.optiday_min.optiday.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfile {
    private Long id;
    private String username;
    private String message;
    private String email;
    private int followersCount;
    private int followingsCount;
    private String followState;
    //0 : 언팔로우 상태, 1 : 팔로우 상태, 2 : 맞팔 상태 3 :
}
