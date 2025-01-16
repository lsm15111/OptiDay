package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.Dto.FollowDto;
import com.optiday_min.optiday.entity.Follow;
import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FollowController {

    private final FollowService followService;

    @GetMapping("/follow")
    public List<Follow> retrieveAllFollow() {
        List<Follow> follows = followService.findAll();
        return follows;
    }


    // 팔로워 목록 조회
    @GetMapping("/follow/followers/{memberId}")
    public ResponseEntity<List<FollowDto>> retrieveFollowers(@PathVariable Integer memberId) {
        List<FollowDto> followers = followService.getFollowers(memberId);
        return ResponseEntity.ok(followers);
    }
    // 팔로잉 목록 조회
    @GetMapping("/follow/following/{memberId}")
    public ResponseEntity<List<FollowDto>> retrieveFollowings(@PathVariable Integer memberId) {
        List<FollowDto> followings = followService.getFollowings(memberId);
        return ResponseEntity.ok(followings);
    }
    // 팔로우
    @PostMapping("/follow/{followerId}/{followingId}")
    public ResponseEntity<String> follow(@PathVariable Integer followerId, @PathVariable Integer followingId) {
        followService.follow(followerId, followingId);
        return ResponseEntity.ok("팔로우 성공!");
    }

    // 언팔로우
    @DeleteMapping("/follow/{followerId}/{followingId}")
    public ResponseEntity<String> unfollow(@PathVariable Integer followerId, @PathVariable Integer followingId) {
        followService.unfollow(followerId, followingId);
        return ResponseEntity.ok("언팔로우 성공!");
    }
    
    
}
