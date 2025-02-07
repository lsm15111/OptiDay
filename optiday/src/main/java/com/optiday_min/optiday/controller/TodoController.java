package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.dto.TodoRequest;
import com.optiday_min.optiday.dto.TodoResponse;
import com.optiday_min.optiday.domain.Todo;
import com.optiday_min.optiday.jwt.UserService;
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

    // Member 모든 Todos 조회
    @GetMapping("/me")
    public List<TodoResponse> retrieveTodosForMe(@RequestHeader("Authorization") String token){
        Long memberId = userService.getMemberIdForToken(token);
        return todoService.getTodosByMemberId(memberId);
    }

    // Task 생성
    @PostMapping("")
    public ResponseEntity<TodoResponse> createTodo(@RequestHeader("Authorization") String token
                                            ,@Valid @RequestBody TodoRequest todoRequest){
        Long memberId = userService.getMemberIdForToken(token);
        TodoResponse todoResponse = todoService.saveTodo(memberId, todoRequest);
        return ResponseEntity.ok(todoResponse);
    }

    // Task 수정
    @PutMapping("/{todoId}")
    public ResponseEntity<?> updateTodoForUser(@RequestHeader("Authorization") String token
                                                ,@PathVariable Long todoId
                                                ,@Valid @RequestBody TodoRequest todoRequest){
        userService.getMemberIdForToken(token);
        Todo todo = todoService.updateTodo(todoId,todoRequest);
        return ResponseEntity.ok(todo);
    }

    // Task 삭제
    @DeleteMapping("/{todoId}")
    public void deleteTodoForMember(@RequestHeader("Authorization") String token,
                                    @PathVariable Long todoId){
        userService.getMemberIdForToken(token);
        todoService.deleteTodo(todoId);
    }


//    //TODO: 관리자 전용 설정하기
//    @GetMapping("/todos")
//    public List<Todo> retrieveAllTodo(){
//        return todoService.getAllTodos();
//    }
//    // Member 하루 Task 조회
//    @GetMapping("/daily")
//    public Optional<List<Todo>> retrieveDailyTodosForUsername(@PathVariable String username){
//        return todoService.getTodayTodosByEmail(username);
//    }
    

}
