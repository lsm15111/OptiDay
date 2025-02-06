package com.optiday_min.optiday.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class FollowResponse {
    private Long id; // 팔로우 ID
    private String username; // 팔로우 이름
    private String message; // 메시지
    private FollowStatus status; //팔로우 상태

}
