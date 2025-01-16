package com.optiday_min.optiday.jpa;

import com.optiday_min.optiday.entity.Follow;
import com.optiday_min.optiday.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    boolean existsByFollowerAndFollowing(Member follower, Member following);

    void deleteByFollowerAndFollowing(Member follower, Member following);

    List<Follow> findAllByFollower(Member follower); //내가 팔로우한 사람들

    List<Follow> findAllByFollowing(Member following); //나를 팔로우한 사람들

}
