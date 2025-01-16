package com.optiday_min.optiday.service;

import com.optiday_min.optiday.Dto.FollowDto;
import com.optiday_min.optiday.entity.Follow;
import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.jpa.FollowRepository;
import com.optiday_min.optiday.jpa.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    
    
    //TODO : 관리자 설정
    //모든 팔로우 조회
    public List<Follow> findAll(){
        return followRepository.findAll().stream().collect(Collectors.toList());
    }


    
    //팔로우 저장
    public void follow(Integer followerId, Integer followingId) {
        Member follower = memberRepository.findById(followerId)
                .orElseThrow(()-> new IllegalArgumentException("팔로우 요청자가 존재하지 않습니다."));
        Member following = memberRepository.findById(followingId)
                .orElseThrow(()-> new IllegalArgumentException("팔로우 대상이 존재하지 않습니다."));
        //이미 팔로우 하고 있는지 확인
        if(followRepository.existsByFollowerAndFollowing(follower, following)) {
            throw new IllegalArgumentException("이미 팔로우한 사용자입니다.");
        }
        // Follow 저장
        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowing(following);
        
        followRepository.save(follow);
    }
    
    //언팔로우
    public void unfollow(Integer followerId, Integer followingId) {
        Member follower = memberRepository.findById(followerId)
                .orElseThrow(() -> new IllegalArgumentException("언팔로우 요청자가 존재하지 않습니다."));
        Member following = memberRepository.findById(followingId)
                .orElseThrow(() -> new IllegalArgumentException("언팔로우 대상이 존재하지 않습니다."));
        // Follow 삭제
        followRepository.deleteByFollowerAndFollowing(follower, following);
    }

    // 팔로워 목록 조회
    public List<FollowDto> getFollowers(Integer memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return followRepository.findAllByFollowing(member)
                .stream()
                .map(follow->{
                    Optional<Member> follower = memberRepository.findById(follow.getFollower().getId());
                    return new FollowDto(follower.get().getId(),follower.get().getName(),follower.get().getEmail());
                }) // Follower의 ID만 추출
                .collect(Collectors.toList());

    }
    // 팔로잉 목록 조회
    public List<FollowDto> getFollowings(Integer memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return followRepository.findAllByFollower(member)
                .stream()
                .map(follow -> {
                    Optional<Member> following = memberRepository.findById(follow.getFollowing().getId());
                    return new FollowDto(following.get().getId(),following.get().getName(),following.get().getEmail());

                })
                .collect(Collectors.toList());
    }


}
