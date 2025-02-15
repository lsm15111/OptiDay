package com.optiday_min.optiday.service;

import com.optiday_min.optiday.dto.DtoMapper;
import com.optiday_min.optiday.dto.FollowResponse;
import com.optiday_min.optiday.dto.FollowStatus;
import com.optiday_min.optiday.domain.Follow;
import com.optiday_min.optiday.domain.Member;
import com.optiday_min.optiday.repository.FollowRepository;
import com.optiday_min.optiday.jwt.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberService memberService;
    private final static Logger logger = LoggerFactory.getLogger(FollowService.class);

    //TODO : 관리자 설정
    //모든 팔로우 조회
    public List<Follow> findAll(){
        return new ArrayList<>(followRepository.findAll());
    }

    // 팔로우
    public FollowResponse follow(Long memberId, Long targetId) {
        Member follower = memberService.getMemberIdForMember(memberId,"팔로우 요청자가 존재하지 않습니다.");
        Member following = memberService.getMemberIdForMember(targetId,"팔로우 대상이 존재하지 않습니다.");
        //이미 팔로우 하고 있는지 확인
        if(followRepository.existsByFollowerAndFollowing(follower, following)) {
            throw new IllegalArgumentException("이미 팔로우한 사용자입니다.");
        }
        Follow follow = Follow.create(follower,following);

        // Follow 상태
        FollowStatus state = followRepository.existsByFollowerAndFollowing(following, follower)? FollowStatus.MUTUAL:FollowStatus.FOLLOWING;
        // Follow 저장
        followRepository.save(follow);

        FollowResponse response = new FollowResponse(
                following.getId(),
                following.getUsername(),
                following.getMessage(),
                state
        );
        return response;
    }

    // 언팔로우
    public void unfollow(Long memberId, Long targetId) {
        Follow follow = followRepository.findByFollowerIdAndFollowingId(memberId,targetId)
                .orElseThrow(()-> new IllegalArgumentException("팔로우 관계가 존재하지 않습니다."));
        followRepository.delete(follow);
    }


    // 팔로우 목록 조회
    public List<FollowResponse> getFollowRelations(Long memberId) {
        // 해당 member 팔로워 또는 팔로잉한 사람들의 목록을 한 번에 조회
        List<Follow> followRelations = followRepository.findFollowingsAndFollowersWithFetch(memberId);

        Set<Long> followingIds = getFollowingIds(followRelations, memberId);
        Set<Long> followerIds = getFollowerIds(followRelations, memberId);


        return followRelations.stream()
                .map(follow -> DtoMapper.toFollowResponse(follow, memberId, followingIds, followerIds))
                .distinct()
                .collect(Collectors.toList());
    }
    
    // memberId -> followingId 존재 체크
    public boolean isFollowing(Long memberId, Long targetId) {
        return followRepository.existsByFollowerIdAndFollowingId(memberId,targetId);
    }

    private Set<Long> getFollowingIds(List<Follow> followRelations, Long memberId) {
        return followRelations.stream()
                .filter(f -> f.getFollower().getId().equals(memberId))
                .map(f -> f.getFollowing().getId())
                .collect(Collectors.toSet());
    }

    private Set<Long> getFollowerIds(List<Follow> followRelations, Long memberId) {
        return followRelations.stream()
                .filter(f -> f.getFollowing().getId().equals(memberId))
                .map(f -> f.getFollower().getId())
                .collect(Collectors.toSet());
    }

    private FollowStatus getFollowStatus(Long otherMemberId, Set<Long> followingIds, Set<Long> followerIds) {
        boolean isFollowing = followingIds.contains(otherMemberId);
        boolean isFollowedBy = followerIds.contains(otherMemberId);

        if (isFollowing && isFollowedBy) {
            return FollowStatus.MUTUAL; // 맞팔
        } else if (isFollowedBy) {
            return FollowStatus.FOLLOWER; // 나를 팔로우한 상태
        } else if (isFollowing) {
            return FollowStatus.FOLLOWING; // 내가 팔로우한 상태
        } else {
            return FollowStatus.NONE; // 서로 팔로우하지 않음 (follow 목록에서는 사용안됨)
        }
    }

}
