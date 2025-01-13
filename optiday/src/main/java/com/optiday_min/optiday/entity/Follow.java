package com.optiday_min.optiday.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
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
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    private Member follower; //팔로우한 사용자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id", nullable = false)
    private Member following; //팔로우된 사용자

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; //팔로우 날짜

    public Follow(Member follower, Member following) {
        this.follower = follower;
        this.following = following;
    }


    // 테이블생성될때 팔로우 날짜 생성
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }


}
