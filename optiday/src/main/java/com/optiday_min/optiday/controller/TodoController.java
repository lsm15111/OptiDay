package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.entity.Todo;
import com.optiday_min.optiday.jpa.MemberRepository;
import com.optiday_min.optiday.jpa.TodoRepository;
import com.optiday_min.optiday.service.MemberService;
import com.optiday_min.optiday.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TodoController {

    //TODO: Repository 로직들 Service 에서 처리
    private final TodoRepository todoRepository;
    private final TodoService todoService;

    // TODO: 관리자 전용 설정하기
    @GetMapping("/todos")
    public List<Todo> retrieveAllTodo(){
        return todoService.getAllTodos();
    }


    // Member 모든 Todos 조회
    @GetMapping("/member/{username}/todos")
    public List<Todo> retrieveTodoForUsername(@PathVariable String username){
        return todoService.getTodosByUsername(username);
    }


    // Member 하루 Todos 조회
    @GetMapping("/member/{username}/daily")
    public Optional<List<Todo>> retrieveDailyTodosForUsername(@PathVariable String username){
        return todoService.getTodayTodosByUsername(username);
    }

    // Todo 생성
    @PostMapping("/member/{username}/todo")
    public void createTodoForUser(@PathVariable String username , @RequestBody Todo todo){
        todoService.saveTodosByUsername(username,todo);
    }

    // Todo 수정
    @PutMapping("/member/{username}/todo/{todoId}")
    public void updateTodoForUser(@PathVariable String username,@PathVariable Integer todoId, @RequestBody Todo todo){
        todoService.getUpdateTodosByOne(username,todoId,todo);
    }

    // Todo 삭제
    @DeleteMapping("/member/{username}/todo/{todoId}")
    public void deleteTodoForUser(@PathVariable String username,@PathVariable Integer todoId){
        // uid에 맞는 user의 todos에서 tid에 맞는 Todos 를 찾아 삭제 구현하기
        todoService.deleteTodoById(todoId);
    }

    

}
