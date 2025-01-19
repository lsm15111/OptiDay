package com.optiday_min.optiday.jpa;

import com.optiday_min.optiday.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByUsername(String username);
    boolean existsByUsername(String username); // 이름 중복 체크
}
