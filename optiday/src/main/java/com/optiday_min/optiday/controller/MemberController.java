package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.Dto.MemberUpdateDto;
import com.optiday_min.optiday.Dto.ProfileDto;
import com.optiday_min.optiday.Dto.SignUpRequestDto;
import com.optiday_min.optiday.service.MemberService;
import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.jpa.MemberRepository;
import lombok.RequiredArgsConstructor;
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
    @GetMapping("/member/{username}")
    public Optional<Member> retrieveUser(@PathVariable String username) {
        Optional<Member> member = memberRepository.findByUsername(username);
        return member;
    }

    

    // 사용자 생성 SignUpRequest DTO -> User Entity
    @PostMapping("/member")
    public ResponseEntity<Member> createUser(@RequestBody SignUpRequestDto signUpRequest) {
        try{
            Member member = memberService.registerMember(signUpRequest);
            return ResponseEntity.ok(member);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().build();
        }
    }

    // 사용자 수정
    @PutMapping("/member/{memberId}")
    public void updateUser(@PathVariable Integer memberId, @RequestBody MemberUpdateDto memberUpdateDto) {
        memberService.toMember(memberId, memberUpdateDto);
    }
    // 사용자 삭제
    @DeleteMapping("/member/{memberId}")
    public void deleteUser(@PathVariable Integer memberId){
        memberRepository.deleteById(memberId);
    }

    // 사용자 프로필 조회
    @GetMapping("/member/{username}/profile")
    public ProfileDto retrieveProfile(@PathVariable String username) {
        return memberService.getUserWithFollowCount(username);
    }
}
