package com.optiday_min.optiday.jpa;

import com.optiday_min.optiday.entity.Follow;
import com.optiday_min.optiday.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByFollowerAndFollowing(Member follower, Member following);

    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);

    void deleteByFollowerAndFollowing(Member follower, Member following);

    @Query("SELECT f FROM Follow f JOIN FETCH f.follower f1 JOIN FETCH f.following f2 WHERE f1.id = :memberId OR f2.id = :memberId")
    List<Follow> findFollowingsAndFollowersWithFetch(@Param("memberId") Long memberId);
}

