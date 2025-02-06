package com.optiday_min.optiday.dto;

import com.optiday_min.optiday.entity.Member;

public class DtoMapper {

    // Member -> ProfileDto
    public static ProfileDto toProfileDto(Member member,String email){
        // 내가 팔로잉 대상일 경우의 카운트
        int followersCount = member.getFollowers().size();
        int followingCount = member.getFollowings().size();
        return ProfileDto.builder()
                .username(member.getUsername())
                .message(member.getMessage())
                .birthdate(member.getBirthdate())
                .phone(member.getPhone())
                .email(email)
                .followers(followersCount) //나를 팔로우 한사람
                .following(followingCount) //내가 팔로우 한사람
                .build();
    }
    // Member -> MemberProfile
    public static MemberProfile toMemberProfileDto(Integer memberId,Member member,String followStatus){
        int followersCount = member.getFollowers().size();
        int followingCount = member.getFollowings().size();
        return MemberProfile.builder()
                .username(member.getUsername())
                .message(member.getMessage())
                .followersCount(followersCount) //나를 팔로우 한사람
                .followingsCount(followingCount) //내가 팔로우 한사람
                .followState(followStatus)
                .build();
    }


/*

    public static Member memberUpdateToMember(Integer memberId,MemberUpdateDto dto){
        return Member.builder()
                .id(memberId)
                .username(dto.getUsername())
                .message(dto.getMessage())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .birthdate(dto.getBirthdate())
                .build();

    }*/


}
