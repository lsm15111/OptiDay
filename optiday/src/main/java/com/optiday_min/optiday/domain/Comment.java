package com.optiday_min.optiday.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comment;

    //댓글 날짜
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "todo_id",nullable = false) //외래 키 설정
    @JsonIgnore
    private Todo todo;


    public Comment(String comment, Todo todo) {
        this.comment = comment;
        this.todo = todo;
    }

    // 테이블 생성될때 댓글 날짜 생성
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}