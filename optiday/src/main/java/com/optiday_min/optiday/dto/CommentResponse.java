package com.optiday_min.optiday.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;


@AllArgsConstructor
@Builder
public class CommentResponse {
    private Long id;
    private String comment;
    private LocalDateTime createdAt;
}
