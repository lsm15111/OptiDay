package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.Dto.MemberUpdateDto;
import com.optiday_min.optiday.Dto.ProfileDto;
import com.optiday_min.optiday.Dto.ProfileUpdateRequest;
import com.optiday_min.optiday.Dto.SignUpRequestDto;
import com.optiday_min.optiday.service.MemberService;
import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.jpa.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    
    //TODO : 관리자 전용 설정하기
    // 사용자 모두 출력
    @GetMapping("/members")
    public List<Member> user() {
        return memberRepository.findAll();
    }


    // 사용자 조회
    @GetMapping("/members/{username}")
    public Optional<Member> retrieveUser(@PathVariable String username) {
        Optional<Member> member = memberRepository.findByUsername(username);
        return member;
    }

    

    // 사용자 생성 SignUpRequest DTO -> User Entity
    @PostMapping("/members")
    public ResponseEntity<Member> createUser(@RequestBody SignUpRequestDto signUpRequest) {
        Member member = memberService.registerMember(signUpRequest);
        return ResponseEntity.ok(member);
    }

    // 사용자 수정
    @PutMapping("/members/{memberId}")
    public void updateUser(@PathVariable Integer memberId, @RequestBody MemberUpdateDto memberUpdateDto) {
        memberService.toMember(memberId, memberUpdateDto);
    }
    // 사용자 삭제
    @DeleteMapping("/members/{memberId}")
    public void deleteUser(@PathVariable Integer memberId){
        memberRepository.deleteById(memberId);
    }

    // 사용자 프로필 조회
    @GetMapping("/members/{username}/profile")
    public ProfileDto retrieveProfile(@PathVariable String username) {
        return memberService.getUserWithFollowCount(username);
    }

    @PutMapping("/members/{username}/profile")
    public ResponseEntity<String> updateProfileForUsername(@PathVariable String username, @RequestBody ProfileUpdateRequest profileUpdateRequest) {
        memberService.updateProfile(username, profileUpdateRequest);
        return ResponseEntity.ok("Profile updated successfully");
    }
}
