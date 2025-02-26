package com.optiday_min.optiday.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class CommentResponse {
    private Long id;
    private String username;
    private String comment;
    private boolean isOwner;
    private LocalDateTime createdAt;
}
