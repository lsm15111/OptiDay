package com.optiday_min.optiday.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long id;

    // 팔로우를 한 사람
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    @JsonIgnore
    private Member follower;

    // 팔로우 대상
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id", nullable = false)
    @JsonIgnore
    private Member following;

    //팔로우 날짜
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;


    // 테이블생성될때 팔로우 날짜 생성
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }


    public Follow(Member follower, Member following) {
        this.follower = follower;
        this.following = following;
    }
    public static Follow create(Member follower, Member following) {
        if (follower.equals(following)) {
            throw new IllegalArgumentException("자기 자신을 팔로우할 수 없습니다.");
        }
        return new Follow(follower, following);
    }
}
