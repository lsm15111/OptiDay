package com.optiday_min.optiday.Dto;

import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.entity.User;

public class DtoMapper {

    // Member -> ProfileDto
    public static ProfileDto toProfileDto(Member member){
        return ProfileDto.builder()
                .name(member.getName())
                .message(member.getMessage())
                .birthday(member.getBirthdate())
                .phone(member.getPhone())
                .email(member.getEmail())
                .followers(member.getFollowers().size())
                .following(member.getFollowing().size())
                .build();
    }

    public static User toUser(UserRequestDto userRequestDto){
        return User.builder()
                .username(userRequestDto.getUsername())
                .password(userRequestDto.getPassword())
                .build();
    }
}
