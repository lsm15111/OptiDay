package com.optiday_min.optiday.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Member {
    @Id
    @GeneratedValue
    private Integer id;
    @Size(min=2, max=10, message = "Name Length 2~10")
    private String name;
    private String password;
    @Size(max=15, message = "Message Max Length 15")
    private String message;
    // **미래 금지 제약필요
    private LocalDate birthdate;
    @Email
    private String email;
    private String phone;

    // 나의 일정 목록
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Todo> todos = new ArrayList<>();

    // 내가 팔로우한 사용자 목록
    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Follow> following = new HashSet<>();

    // 나를 팔로우한 사용자 목록
    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Follow> followers = new HashSet<>();

    @Override
    public String toString() {
        return "Member{" +
                "phone=" + phone +'\'' +
                ", email='" + email + '\'' +
                ", birthday=" + birthdate +
                ", message='" + message + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", id=" + id +
                '}';
    }
}
