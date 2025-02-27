package com.optiday_min.optiday.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "카테고리 이름은 필수 입력값입니다.")
    @Size(max = 5, message = "카테고리 이름은 5자까지 입력가능합니다.")
    private String name; //카테고리 이름

    @NotBlank(message = "색상은 필수 입력값입니다.")
    private String color; // HEX값 or 색상 이름

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "member_id")
    @JsonBackReference
    private Member member; // category 작성자

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = false)
    @JsonIgnore
    private List<Todo> todos = new ArrayList<>();

    public Category(String name, String color, Member member) {
        this.name = name;
        this.color = color;
        this.member = member;
    }

    @Override
    public String toString() {
        return "Category{" +
                "color='" + color + '\'' +
                ", name='" + name + '\'' +
                ", id=" + id +
                '}';
    }
}