package com.optiday_min.optiday.controller;

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
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;


    // 사용자 조회
    @GetMapping("/member/{name}")
    public Optional<Member> retrieveUser(@PathVariable String name) {
        Optional<Member> member = memberRepository.findByName(name);
        return member;
    }

    // 사용자 모두 출력
    @GetMapping("/members")
    public List<Member> user() {
        return memberRepository.findAll();
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
    @PostMapping("/member/{memberId}")
    public ResponseEntity<Member> updateUser(@PathVariable Integer memberId, @RequestBody Member member) {

        member.setId(memberId);
        memberRepository.save(member);
        return ResponseEntity.ok(member);
    }
    // 사용자 삭제
    @DeleteMapping("/member/{memberId}")
    public void deleteUser(@PathVariable Integer memberId){
        memberRepository.deleteById(memberId);
    }

    // 사용자 프로필 조회
    @GetMapping("/member/{name}/profile")
    public ProfileDto retrieveProfile(@PathVariable String name) {
        return memberService.getUserWithFollowCount(name);
    }
}
