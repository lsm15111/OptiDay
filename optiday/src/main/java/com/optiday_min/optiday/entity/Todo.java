package com.optiday_min.optiday.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member; // 연결된 카테고리

    private Integer categoryId;


    @Override
    public String toString() {
        return "Todo{" +
                "status=" + status +
                ", endDate=" + endDate +
                ", startDate=" + startDate +
                ", description='" + description + '\'' +
                ", title='" + title + '\'' +
                ", id=" + id +
                '}';
    }
}
