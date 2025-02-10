package com.optiday_min.optiday.dto;

public enum FollowStatus {
    MUTUAL,    // 서로 팔로우
    FOLLOWER,  // 상대방이 나를 팔로우함
    FOLLOWING, // 내가 상대방을 팔로우함
    NONE       // 서로 팔로우하지 않음
}
