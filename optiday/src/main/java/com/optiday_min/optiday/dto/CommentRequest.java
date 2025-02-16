package com.optiday_min.optiday.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequest {
    @NotBlank(message = "댓글은 필수 입력값입니다.")
    private String comment;

}
