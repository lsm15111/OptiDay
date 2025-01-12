package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.Dto.SignUpRequest;
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


    @GetMapping("/user/{memberId}")
    public Optional<Member> retrieveUser(@PathVariable Integer memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        return member;
    }

    // 사용자 모두 출력
    @GetMapping("/users")
    public List<Member> user() {
        return memberRepository.findAll();
    }

    // 사용자 생성 SignUpRequest DTO -> User Entity
    @PostMapping("/user")
    public void createUser(@RequestBody SignUpRequest signUpRequest) {
        Member member = memberService.registerMember(signUpRequest);
        memberRepository.save(member);
    }

    // 사용자 수정
    @PostMapping("/user/{memberId}")
    public ResponseEntity<Member> updateUser(@PathVariable Integer memberId, @RequestBody Member member) {
        memberRepository.deleteById(memberId);
        member.setId(memberId);
        memberRepository.save(member);
        return ResponseEntity.ok(member);
    }
    // 사용자 삭제
    @DeleteMapping("/user/{memberId}")
    public void deleteUser(@PathVariable Integer memberId){
        memberRepository.deleteById(memberId);
    }

}
