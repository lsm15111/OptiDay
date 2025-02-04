package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.dto.*;
import com.optiday_min.optiday.exception.NotAvailableRequestException;
import com.optiday_min.optiday.jwt.JwtTokenUtil;
import com.optiday_min.optiday.jwt.UserRepository;
import com.optiday_min.optiday.jwt.UserService;
import com.optiday_min.optiday.service.MemberService;
import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.jpa.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.tool.schema.spi.DelayedDropRegistryNotAvailableImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static javax.crypto.Cipher.SECRET_KEY;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;

    private final UserService userService;


    //TODO : 관리자 전용 설정하기
    // 사용자 모두 출력
    @GetMapping("/all")
    public List<Member> member() {
        List<Member> member = memberRepository.findAll();
        return member;
    }

    // 회원 조회
    @GetMapping("/me")
    public ResponseEntity<Member> retrieveMember(@RequestHeader("Authorization") String token) {

        Long memberId = userService.getMemberIdForToken(token);
        Member member = memberService.getMemberIdForMember(memberId);
        return ResponseEntity.ok(member);
    }
    // 사용자 생성 SignUpRequest DTO -> User Entity
    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@Valid @RequestBody SignUpRequestDto signUpRequest) {

        // Member 생성
        Member member = memberService.registerMember(signUpRequest);
        // User 등록
        userService.registerUser(signUpRequest.getEmail(), signUpRequest.getPassword(),member);
        return ResponseEntity.ok("Member created successfully");
    }

    @GetMapping("/message")
    public String retrieveMessage(@RequestHeader("Authorization") String token) {
        Long memberId = userService.getMemberIdForToken(token);
        Member member = memberService.getMemberIdForMember(memberId);
        return  member.getMessage();
    }





//
//    // 사용자 생성 SignUpRequest DTO -> User Entity
//    @PostMapping("/members")
//    public ResponseEntity<Member> createUser(@RequestHeader("Authorization") String token,
//                                             @RequestBody SignUpRequestDto signUpRequest) {
//        // 요청 예외처리 (DTO 내부 값이 null로 들어왔을때)
//
//        try{
//            if(signUpRequest.getUsername()!=null&&signUpRequest.getUsername().length()>=2){
//
//            }else if (signUpRequest.getPassword()!=null) {
//
//            }
//
//
//        }catch (Exception e){
//            throw new IllegalArgumentException();
//        }
//        //throw new NotAvailableRequestException();
//
//        Member member = memberService.registerMember(signUpRequest);
//        return ResponseEntity.ok(member);
//    }
//
//    // 사용자 수정 -            멱등성
//    @PutMapping("/members/{memberId}")
//    public void updateUser(@RequestHeader("Authorization") String token,
//                           @RequestBody MemberUpdateDto memberUpdateDto) {
//        memberService.updateMember(memberId, memberUpdateDto);
//    }
//    // 사용자 삭제
//    @DeleteMapping("/members/{memberId}")
//    public void deleteUser(@RequestHeader("Authorization") String token){
//        memberRepository.deleteById(memberId);
//    }
//
    // 내 프로필 조회
    @GetMapping("/profile")
    public ResponseEntity<ProfileDto> retrieveProfile(@RequestHeader("Authorization") String token) {
        Long memberId = userService.getMemberIdForToken(token);
        ProfileDto profile = memberService.getUserWithFollowCount(memberId);
        return ResponseEntity.ok(profile);
    }
//
    // 프로필 업데이트
    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token,
                                                           @RequestBody ProfileUpdate profileUpdate) {
        Long memberId = userService.getMemberIdForToken(token);
        memberService.updateProfile(memberId, profileUpdate);
        return ResponseEntity.ok("Profile updated successfully");
    }
//    //상대방의 profile 보기
//    @GetMapping("/account/search/{pickMemberId}")
//    public MemberProfile retrieveProfileForMemberId(@RequestHeader("Authorization") String token,
//                                                    @PathVariable Integer pickMemberId) {
//        return memberService.getMemberProfile(username,pickMemberId);
//    }










    // 멤버 데이터 반환 (Follow Search)
    @GetMapping("/search")
    public Page<?> getMembers(
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "currentPage", defaultValue = "0") int currentPage,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(value = "search", defaultValue = "") String search // 검색어 추가
    ) {
        Long memberId = userService.getMemberIdForToken(token);
//        int batchSize = 10; // 10페이지 묶음 단위
        int startPage = currentPage * pageSize; //시작 페이지 계산

        // 100개단위 페이지 반환
        // (시작크기,시작+size 까지,검색어)
        return memberService.searchMembers(startPage, pageSize, search,memberId);
    }
}
