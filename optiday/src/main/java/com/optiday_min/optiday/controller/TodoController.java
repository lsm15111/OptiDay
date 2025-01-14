package com.optiday_min.optiday.controller;

import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.entity.Todo;
import com.optiday_min.optiday.jpa.MemberRepository;
import com.optiday_min.optiday.jpa.TodoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TodoController {

    private final MemberRepository memberRepository;
    private final TodoRepository todoRepository;

    public TodoController(MemberRepository memberRepository, TodoRepository todoRepository) {
        this.memberRepository = memberRepository;
        this.todoRepository = todoRepository;
    }
    // User Todo 조회
    @GetMapping("/member/{memberId}/todos")
    public List<Todo> retrieveTodoForUsername(@PathVariable int memberId){
        Optional<Member> member = memberRepository.findById(memberId);
        // 못찾을때 에러필요
        return member.get().getTodos();
    }

    // Todo 생성
    @PostMapping("/member/{memberId}/todo")
    public void createTodoForUser(@PathVariable int memberId , @RequestBody Todo todo){
        Optional<Member> member = memberRepository.findById(memberId);
        todo.setMember(member.get());
        todoRepository.save(todo);
    }
    // Todo 삭제
    @DeleteMapping("/member/{memberId}/todos/{tid}")
    public void deleteTodoForUser(@PathVariable int memberId,@PathVariable int tid){
        // uid에 맞는 user의 todos에서 tid에 맞는 todo 를 찾아 삭제 구현하기
        Optional<Member> member = memberRepository.findById(memberId);
        todoRepository.deleteById(tid);
    }
    

}
