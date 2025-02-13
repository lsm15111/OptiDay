package com.optiday_min.optiday.dto;

import com.optiday_min.optiday.domain.Todo;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class TodoResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isCompleted;
    private Integer categoryId;

    // 생성자 추가
    public TodoResponse(Long id, String title, String description, LocalDate startDate, LocalDate endDate, boolean isCompleted, Integer categoryId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isCompleted = isCompleted;
        this.categoryId = categoryId;
    }

    // 정적 팩토리 메서드 추가
    public static TodoResponse from(Todo todo) {
        return new TodoResponse(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.getStartDate(),
                todo.getEndDate(),
                todo.isCompleted(),
                (todo.getCategory() != null) ? todo.getCategory().getId().intValue() : null
        );
    }


}
