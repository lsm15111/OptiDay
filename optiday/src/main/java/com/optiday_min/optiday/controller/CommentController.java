package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.domain.Comment;
import com.optiday_min.optiday.domain.Member;
import com.optiday_min.optiday.dto.CommentRequest;
import com.optiday_min.optiday.dto.CommentResponse;
import com.optiday_min.optiday.jwt.UserService;
import com.optiday_min.optiday.service.CommentService;
import com.optiday_min.optiday.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api//comments")
@RequiredArgsConstructor
public class CommentController {

    private final UserService userService;
    private final CommentService commentService;
    private final MemberService memberService;




//    // Todos -> Comment List
//    @GetMapping("{todoId}")
//    public List<CommentResponse> retrieveCommentForTodoId(@PathVariable Long todoId){
//
//    }
}
