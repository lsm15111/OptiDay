package com.optiday_min.optiday.Todo;

import com.optiday_min.optiday.User.User;
import com.optiday_min.optiday.User.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TodoController {

    private UserRepository userRepository;
    private TodoRepository todoRepository;

    public TodoController(UserRepository userRepository, TodoRepository todoRepository) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
    }
    // User Todo 조회
    @GetMapping("/user/{uid}/todos")
    public List<Todo> retrieveTodoForUser(@PathVariable int uid){
        Optional<User> user = userRepository.findById(uid);
        // 못찾을때 에러필요
        return user.get().getTodos();
    }

    // Todo 생성
    @PostMapping("/user/{uid}/todos")
    public void createTodoForUser(@PathVariable int uid , @RequestBody Todo todo){
        Optional<User> user = userRepository.findById(uid);
        todo.setUser(user.get());
        todoRepository.save(todo);
    }
    // Todo 삭제
    @DeleteMapping("/user/{uid}/todos/{tid}")
    public void deleteTodoForUser(@PathVariable int uid,@PathVariable int tid){
        // uid에 맞는 user의 todos에서 tid에 맞는 todo 를 찾아 삭제 구현하기
        todoRepository.deleteById(tid);
    }
    

}
