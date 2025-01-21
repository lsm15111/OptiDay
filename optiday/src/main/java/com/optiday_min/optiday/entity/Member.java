package com.optiday_min.optiday.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Size(min=2, max=10, message = "Name Length 2~10")
    private String username;
    private String password;
    @Size(max=15, message = "Message Max Length 15")
    private String message;
    // **미래 금지 제약필요
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthdate;
    @Email
    private String email;
    private String phone;

    // 나의 일정 목록
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Todo> todos = new ArrayList<>();

    // 나의 카테고리
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Category> categories = new ArrayList<>();

    // 내가 팔로우한 사람들
    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followings = new ArrayList<>();

    // 나를 팔로우한 사람들
    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followers = new ArrayList<>();



    @Override
    public String toString() {
        return "Member{" +
                "phone=" + phone +'\'' +
                ", email='" + email + '\'' +
                ", birthday=" + birthdate +
                ", message='" + message + '\'' +
                ", password='" + password + '\'' +
                ", username='" + username + '\'' +
                ", id=" + id +
                '}';
    }
}
