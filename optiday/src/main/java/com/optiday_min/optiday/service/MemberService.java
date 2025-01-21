package com.optiday_min.optiday.service;


import com.optiday_min.optiday.Dto.*;
import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.jpa.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;


    // 회원가입 (기본값 데이터 추가, 비밀번호 암호화)
    public Member registerMember(SignUpRequestDto signUpRequest) {
        // 이름 중복 검사
        if(memberRepository.existsByUsername(signUpRequest.getUsername())){
            throw new IllegalArgumentException("Username already exists");
        }
        signUpRequest.setMessage("안녕하세요, "+signUpRequest.getUsername());
        signUpRequest.setPassword(hashPassword(signUpRequest.getPassword()));
        return memberRepository.save(signUpRequest.toEntity());
    }

    // 특정 사용자 정보와 팔로워/팔로잉 수 반환
    public ProfileDto getUserWithFollowCount(String name) {
        Member member = memberRepository.findByUsername(name)
                .orElseThrow(()-> new EntityNotFoundException("Member not found"));
        return DtoMapper.toProfileDto(member);
    }

    public String hashPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }

    // MemberUpdateDto -> Member
    public void toMember(Integer memberId,MemberUpdateDto memberUpdateDto){
        //유저 네임 중복 시 예외
        if (memberRepository.existsByUsername(memberUpdateDto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        Member member = memberRepository.findById(memberId)
                        .orElseThrow(()-> new EntityNotFoundException("Member not found"));

        member.setUsername(memberUpdateDto.getUsername());
        member.setMessage(memberUpdateDto.getMessage());
        member.setBirthdate(memberUpdateDto.getBirthdate());
        member.setPhone(memberUpdateDto.getPhone());
        member.setEmail(memberUpdateDto.getEmail());
        memberRepository.save(member);

    }

    public void updateProfile(String username, ProfileUpdateRequest profileUpdateRequest) {
        //유저 네임 중복 시 예외
        String rename = profileUpdateRequest.getUsername();
        if (!(rename.equals(username))&&memberRepository.existsByUsername(rename)) {
            throw new IllegalArgumentException("Username already exists");
        }
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(()-> new EntityNotFoundException("Member not found"));
        member.setUsername(profileUpdateRequest.getUsername());
        member.setMessage(profileUpdateRequest.getMessage());
        member.setBirthdate(profileUpdateRequest.getBirthday());
        member.setPhone(profileUpdateRequest.getPhone());
        member.setEmail(profileUpdateRequest.getEmail());
        memberRepository.save(member);
    }


    // TODO : 팔로우 페이지에서 사용
    // 모든 사용자 정보와 팔로워/팔로잉 수 반환
    /*public List<UserWithFollowCountDto> getAllUsersWithFollowCount() {
        return userRepository.findAll().stream()
                .map(DtoMapper::toUserWithFollowCountDto)
                .collect(Collectors.toList());
    }*/





}
