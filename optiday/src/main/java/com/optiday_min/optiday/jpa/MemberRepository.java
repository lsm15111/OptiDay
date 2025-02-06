package com.optiday_min.optiday.jpa;

import com.optiday_min.optiday.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String username);
    boolean existsByUsername(String username);

    //페이징
    Page<Member> findByIdNot(Long myId, Pageable pageable);
    Page<Member> findByUsernameContainingAndIdNot(String search, Long myId, Pageable pageable);
    Page<Member> findByUsernameContaining(String username, Pageable pageable);

//    List<AccountSearchDto> findAllBy();

}
