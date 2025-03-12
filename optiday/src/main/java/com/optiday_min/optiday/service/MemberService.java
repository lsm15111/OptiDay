package com.optiday_min.optiday.service;


import com.optiday_min.optiday.dto.*;
import com.optiday_min.optiday.domain.Member;
import com.optiday_min.optiday.exception.NotAvailableRequestException;
import com.optiday_min.optiday.repository.FollowRepository;
import com.optiday_min.optiday.repository.MemberRepository;
import com.optiday_min.optiday.jwt.UserService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.MethodArgumentNotValidException;


@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final UserService userService;
    private final FollowRepository followRepository;

    // memberId
    public Member getMemberIdForMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(()->new EntityNotFoundException("Member not found"));
    }
    // memberId, message Overloading
    public Member getMemberIdForMember(Long memberId,String message) {
        return memberRepository.findById(memberId)
                .orElseThrow(()->new EntityNotFoundException(message));
    }

    // 회원가입 (기본값 데이터 추가, 비밀번호 암호화)
    public Member registerMember(SignUpRequest signUpRequest) {
        // 첫 상태 메시지 설정
        signUpRequest.setMessage("안녕하세요, "+signUpRequest.getUsername());
        // Member 생성
        Member member = memberRepository.save(signUpRequest.toEntity());
        return member;
    }

    @Transactional
    public void deleteAccount(Long memberId,AccountDeleteRequest accountDeleteRequest) {
        userService.deleteUser(memberId,accountDeleteRequest);
        memberRepository.deleteById(memberId);
    }

    // 특정 사용자 정보와 팔로워/팔로잉 수 반환
    public ProfileDto getUserWithFollowCount(Long memberId) {
        Member member = getMemberIdForMember(memberId);
        String email = userService.getEmailByMemberId(memberId);
        return DtoMapper.toProfileDto(member,email);
    }
    
    //프로필 수정 Todo 이미지 추가하기
    @Transactional
    public void updateProfile(Long memberId, ProfileUpdate profileUpdate) {
        //유저 네임 중복 시 예외
        Member member = getMemberIdForMember(memberId);
        String username = member.getUsername();
        String rename = profileUpdate.getUsername();
        // 이름이 변경되었지만 중복일 때 예외
        if (!(rename.equals(username))&&isUsername(rename)) {
            throw new IllegalArgumentException("Username already exists");
        }else if(!rename.equals(username)) { //이름이 변경됐을때
            member.setUsername(rename);
        }

        member.setBirthdate(profileUpdate.getBirthdate());
        member.setMessage(profileUpdate.getMessage());
        member.setPhone(profileUpdate.getPhone());
        memberRepository.save(member);
    }

    // 검색 Member 페이징
    public Page<Member> searchMembers(int currentPage, int pageSize, String search,Long myId) {
        // Pageable 객체 생성
        PageRequest pageable = PageRequest.of(currentPage, pageSize, Sort.by("id").ascending());
        // 검색 조건 적용
        if (search == null || search.trim().isEmpty()) {
            return memberRepository.findByIdNot(myId,pageable);
        } else {
            return memberRepository.findByUsernameContainingAndIdNot(search.trim(),myId, pageable);
        }
    }

    // 유저 네임 존재 true,false 반환
    public boolean isUsername(String username) {
        return memberRepository.existsByUsername(username);
    }


    public MemberProfile getMemberProfile(Long memberId, Long pickMemberId) {
        Member pickMember = memberRepository.findById(pickMemberId)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        String status = followStatus(memberId,pickMemberId);
        return DtoMapper.toMemberProfileDto(pickMember,status);
    }

    private String followStatus(Long memberId, Long pickMemberId) {
        //나 -> 상대방
        boolean follower = followRepository.existsByFollowerIdAndFollowingId(memberId,pickMemberId);
        //상대방 -> 나
        boolean following = followRepository.existsByFollowerIdAndFollowingId(pickMemberId,memberId);
        // 맞팔 상태
        if(follower&&following) return "MUTUAL";
        // 상대방 -> 나
        if(follower) return "FOLLOWING";
        // 나 -> 상대방
        if(following) return "FOLLOWER";
        // 서로 팔로우하지 않은 상태
        return "NONE";
    }

}
