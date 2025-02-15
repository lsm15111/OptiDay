package com.optiday_min.optiday.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode // equals() & hashCode() 자동 생성 -> distinct() 작동하게만듬
public class FollowResponse {
    private Long id; // 팔로우 ID
    private String username; // 팔로우 이름
    private String message; // 메시지
    private FollowStatus status; //팔로우 상태

}
