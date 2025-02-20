package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.dto.CommentResponse;
import com.optiday_min.optiday.dto.TodoRequest;
import com.optiday_min.optiday.dto.TodoResponse;
import com.optiday_min.optiday.domain.Todo;
import com.optiday_min.optiday.exception.NotAvailableRequestException;
import com.optiday_min.optiday.jwt.UserService;
import com.optiday_min.optiday.service.FollowService;
import com.optiday_min.optiday.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;
    private final UserService userService;
    private final FollowService followService;

    // Member 모든 Todos 조회
    @GetMapping("/me")
    public ResponseEntity<List<TodoResponse>> retrieveTodosForMe(@RequestHeader("Authorization") String token){
        Long memberId = userService.getMemberIdForToken(token);
        List<TodoResponse> todos = todoService.getTodosByMemberId(memberId);
        return ResponseEntity.ok(todos);
    }

    // Following 중인 사람의 Todos 보기
    @GetMapping("/followings/{followingId}")
    public ResponseEntity<List<TodoResponse>> retrieveTodoForFollowing(@RequestHeader("Authorization") String token
                                                                      ,@PathVariable Long followingId){
        Long memberId = userService.getMemberIdForToken(token);
        if(!followService.isFollowing(memberId, followingId)){
            throw new IllegalArgumentException("팔로잉 상태가 아닙니다.");
        }
        List<TodoResponse> followingTodos = todoService.getTodosByMemberId(followingId);
        return ResponseEntity.ok(followingTodos);
    }

    // Task 생성
    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(@RequestHeader("Authorization") String token
                                            ,@Valid @RequestBody TodoRequest todoRequest){
        Long memberId = userService.getMemberIdForToken(token);
        TodoResponse todoResponse = todoService.saveTodo(memberId, todoRequest);
        return ResponseEntity.ok(todoResponse);
    }

    // Task 수정
    @PutMapping("/{todoId}")
    public ResponseEntity<TodoResponse> updateTodoForUser(@RequestHeader("Authorization") String token
                                                ,@PathVariable Long todoId
                                                ,@Valid @RequestBody TodoRequest todoRequest){
        userService.getMemberIdForToken(token);
        TodoResponse todo = todoService.updateTodo(todoId,todoRequest);
        return ResponseEntity.ok(todo);
    }

    // Task 삭제
    @DeleteMapping("/{todoId}")
    public void deleteTodoForMember(@RequestHeader("Authorization") String token,
                                    @PathVariable Long todoId){
        userService.getMemberIdForToken(token);
        todoService.deleteTodo(todoId);
    }

    @GetMapping("{todoId}/comments")
    public ResponseEntity<List<CommentResponse>> retrieveCommentsByTodoId(@PathVariable Long todoId){
        List<CommentResponse> comments = todoService.getCommentByTodoId(todoId);
        return ResponseEntity.ok(comments);
    }

}
