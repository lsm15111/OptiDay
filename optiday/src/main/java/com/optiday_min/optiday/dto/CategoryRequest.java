package com.optiday_min.optiday.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    @NotBlank(message = "카테고리 이름은 필수 입력값 입니다")
    private String name;
    @NotBlank(message = "카테고리 색상은 필수 선택값 입니다")
    private String color;
}