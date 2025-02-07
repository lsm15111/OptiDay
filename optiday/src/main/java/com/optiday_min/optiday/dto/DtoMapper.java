package com.optiday_min.optiday.dto;

import com.optiday_min.optiday.domain.Follow;
import com.optiday_min.optiday.domain.Member;

import java.util.Set;

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
    public static MemberProfile toMemberProfileDto(Member pickMember,String followStatus){
        int followersCount = pickMember.getFollowers().size();
        int followingCount = pickMember.getFollowings().size();
        return MemberProfile.builder()
                .username(pickMember.getUsername())
                .message(pickMember.getMessage())
                .followersCount(followersCount) //나를 팔로우 한사람
                .followingsCount(followingCount) //내가 팔로우 한사람
                .followState(followStatus)
                .build();
    }

    public static FollowResponse toFollowResponse(Follow follow, Long memberId,
                                                  Set<Long> followingIds, Set<Long> followerIds) {
        Member otherMember = follow.getFollower().getId().equals(memberId)
                ? follow.getFollowing()
                : follow.getFollower();

        FollowStatus state = getFollowStatus(otherMember.getId(), followingIds, followerIds);

        return new FollowResponse(
                otherMember.getId(),
                otherMember.getUsername(),
                otherMember.getMessage(),
                state
        );
    }

    private static FollowStatus getFollowStatus(Long targetId, Set<Long> followingIds, Set<Long> followerIds) {
        if (followingIds.contains(targetId) && followerIds.contains(targetId)) {
            return FollowStatus.MUTUAL;  // 서로 팔로우 상태
        } else if (followingIds.contains(targetId)) {
            return FollowStatus.FOLLOWING;
        } else if (followerIds.contains(targetId)) {
            return FollowStatus.FOLLOWER;
        } else {
            return FollowStatus.NONE;
        }
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
