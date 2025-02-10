package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.dto.*;
import com.optiday_min.optiday.jwt.UserService;
import com.optiday_min.optiday.service.MemberService;
import com.optiday_min.optiday.domain.Member;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;
    private final UserService userService;

    //TODO : 관리자 권한 전용 만들기

    // 회원 조회
    @GetMapping("/me")
    public ResponseEntity<Member> retrieveMember(@RequestHeader("Authorization") String token) {

        Long memberId = userService.getMemberIdForToken(token);
        Member member = memberService.getMemberIdForMember(memberId);
        return ResponseEntity.ok(member);
    }

    // 회원 생성 SignUpRequest -> User Entity
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        // Member 생성
        Member member = memberService.registerMember(signUpRequest);
        // User 등록
        userService.registerUser(signUpRequest.getEmail(), signUpRequest.getPassword(),member);
        return ResponseEntity.ok("Member created successfully");
    }

    // 상태 메시지 조회
    @GetMapping("/message")
    public String retrieveMessage(@RequestHeader("Authorization") String token) {
        Long memberId = userService.getMemberIdForToken(token);
        Member member = memberService.getMemberIdForMember(memberId);
        return  member.getMessage();
    }

    // 사용자 삭제
    @DeleteMapping("")
    public ResponseEntity<String> deleteMember(@RequestHeader("Authorization") String token
                                               , @RequestBody AccountDeleteRequest accountDeleteRequest) {
        Long memberId = userService.getMemberIdForToken(token);
        memberService.deleteAccount(memberId, accountDeleteRequest);
        return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
    }

    // 내 프로필 조회
    @GetMapping("/profile")
    public ResponseEntity<ProfileDto> retrieveProfile(@RequestHeader("Authorization") String token) {
        Long memberId = userService.getMemberIdForToken(token);
        ProfileDto profile = memberService.getUserWithFollowCount(memberId);
        return ResponseEntity.ok(profile);
    }

    // 프로필 업데이트 - 멱등성
    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token,
                                                           @RequestBody ProfileUpdate profileUpdate) {
        Long memberId = userService.getMemberIdForToken(token);
        memberService.updateProfile(memberId, profileUpdate);
        return ResponseEntity.ok("Profile updated successfully");
    }

    // 상대방의 profile 조회
    @GetMapping("/profile/{targetId}")
    public ResponseEntity<MemberProfile> retrieveProfileForMemberId(@RequestHeader("Authorization") String token,
                                                    @PathVariable Long targetId) {
        Long memberId = userService.getMemberIdForToken(token);
        MemberProfile memberProfile = memberService.getMemberProfile(memberId,targetId);
        return ResponseEntity.ok(memberProfile);
    }

//    @PostMapping("/passwordCheck")

    // 계정 검색 멤버 데이터 반환 (Follow Search)
    @GetMapping("/search")
    public Page<?> getMembers(
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "currentPage", defaultValue = "0") int currentPage,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "search", defaultValue = "") String search // 검색어 추가
    ) {
        Long memberId = userService.getMemberIdForToken(token);
        // int batchSize = 10; // 10페이지 묶음 단위
        int startPage = currentPage; //시작 페이지 계산

        // 10개단위 페이지 반환
        // (시작크기,시작+size 까지,검색어)
        return memberService.searchMembers(currentPage, pageSize, search,memberId);
    }
}
