package com.optiday_min.optiday.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name; //카테고리 이름
    private String color; // HEX값 or 색상 이름

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "member_id")
    @JsonBackReference
    private Member member; // category 작성자

    /*// 연관된 Todo 목록
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Todo> todos;*/


    @Override
    public String toString() {
        return "Category{" +
                "color='" + color + '\'' +
                ", name='" + name + '\'' +
                ", id=" + id +
                '}';
    }
}