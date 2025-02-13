package com.optiday_min.optiday.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TodoRequest {
    @NotBlank(message = "제목은 필수 입력값입니다.")
    @Size(min=1, max=15, message = "제목은 1~15자까지 입력 가능합니다.")
    private String title;
    private String description;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private boolean isCompleted = false;
    private Integer categoryId;


    @AssertTrue(message = "시작 날짜는 끝 날짜보다 이전이어야 합니다.")
    public boolean isStartDateBeforeEndDate() {
        if (startDate == null || endDate == null) return true; // 다른 검증에 맡김
        return !startDate.isAfter(endDate); // startDate가 endDate보다 이후면 false 반환
    }
}
