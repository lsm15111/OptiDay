package com.optiday_min.optiday.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

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
    private Long id;
    @NotBlank(message = "이름은 필수 입력 값입니다.")
    @Size(min=2, max=10, message = "이름은 2~10자까지 입력가능합니다.")
    private String username;
    @Size(max=15, message = "메세지는 15자까지 입력가능합니다.")
    private String message;


    // 생년월일: 미래 날짜 금지
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @PastOrPresent(message = "생년월일은 미래 날짜로 설정할 수 없습니다.")
    private LocalDate birthdate;
    // 전화번호: 숫자, 하이픈(-) 허용

    private String phone;

    // 나의 일정 목록
    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Todo> todos = new ArrayList<>();

    // 나의 카테고리
    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Category> categories = new ArrayList<>();

    // 내가 팔로우한 사람들
    @JsonIgnore
    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followings = new ArrayList<>();

    // 나를 팔로우한 사람들
    @JsonIgnore
    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followers = new ArrayList<>();

    @Override
    public String toString() {
        return "Member{" +
                "phone=" + phone +'\'' +
                ", birthday=" + birthdate +
                ", message='" + message + '\'' +
                ", username='" + username + '\'' +
                ", id=" + id +
                '}';
    }

}
