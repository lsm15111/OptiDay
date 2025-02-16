package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.dto.CommentResponse;
import com.optiday_min.optiday.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;


//    @GetMapping
//    public List<CommentResponse>
}
