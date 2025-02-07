package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.dto.FollowResponse;
import com.optiday_min.optiday.domain.Follow;
import com.optiday_min.optiday.jwt.UserService;
import com.optiday_min.optiday.service.FollowService;
import com.optiday_min.optiday.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follows")
public class FollowController {

    private final FollowService followService;
    private final UserService userService;

    private final static Logger logger = LoggerFactory.getLogger(FollowController.class);
    // 모든 팔로우 목록
    @GetMapping("/all")
    public List<Follow> retrieveAllFollow() {
        List<Follow> follows = followService.findAll();
        return follows;
    }

    // 팔로워, 팔로잉 목록 조회 TODO (N+1문제 해결, 중복 데이터 조회 방지)
    @GetMapping("/relations")
    public ResponseEntity<List<FollowResponse>> retrieveFollowRelations(@RequestHeader("Authorization") String token) {
        Long memberId = userService.getMemberIdForToken(token);
        List<FollowResponse> followRelations = followService.getFollowRelations(memberId);
        return ResponseEntity.ok(followRelations);
    }
    
    // 팔로우 A 가 B를 추가
    @PostMapping("/{targetId}")
    public ResponseEntity<String> follow(@RequestHeader("Authorization") String token,
                                         @PathVariable Long targetId) {
        Long memberId = userService.getMemberIdForToken(token);
        followYourself(memberId, targetId); // 잘못된 요청
        followService.follow(memberId,targetId);
        return ResponseEntity.ok("팔로우 성공!");
    }

    // 언팔로우
    @DeleteMapping("/{targetId}")
    public ResponseEntity<String> unfollow(@RequestHeader("Authorization") String token,
                                           @PathVariable Long targetId) {
        Long memberId = userService.getMemberIdForToken(token);
        followYourself(memberId, targetId); // 잘못된 요청
        followService.unfollow(memberId,targetId);
        return ResponseEntity.ok("언팔로우 성공!");
    }

    private void followYourself(Long memberId, Long targetId) {
        if (memberId.equals(targetId)) {
            throw new IllegalArgumentException("자기 자신을 팔로우할 수 없습니다.");
        }
    }

//    // follow 페이징
//    @GetMapping("/search")
//    public ResponseEntity<List<AccountSearchDto>> searchAccounts(@RequestHeader("Authorization") String token) {
//        List<AccountSearchDto> accountSearch = memberService.searchMembers(memberId);
//        return ResponseEntity.ok(accountSearch);
//    }
}
