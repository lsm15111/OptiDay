package com.optiday_min.optiday.Dto;

import com.optiday_min.optiday.entity.Member;

public class DtoMapper {

    // Member -> ProfileDto
    public static ProfileDto toProfileDto(Member member){
        // 내가 팔로잉 대상일 경우의 카운트
        int followersCount = member.getFollowers().size();
        int followingCount = member.getFollowings().size();
        return ProfileDto.builder()
                .name(member.getName())
                .message(member.getMessage())
                .birthday(member.getBirthdate())
                .phone(member.getPhone())
                .email(member.getEmail())
                .followers(followersCount) //나를 팔로우 한사람
                .following(followingCount) //내가 팔로우 한사람
                .build();
    }


}
