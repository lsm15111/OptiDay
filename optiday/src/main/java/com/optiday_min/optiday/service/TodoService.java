package com.optiday_min.optiday.service;

import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.entity.Todo;
import com.optiday_min.optiday.jpa.MemberRepository;
import com.optiday_min.optiday.jpa.TodoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final MemberRepository memberRepository;
    private final TodoRepository todoRepository;

    // Member 오늘 Todos 찾기
    public Optional<List<Todo>> getTodayTodosByUsername(String name){
        Optional<Member> member = memberRepository.findByUsername(name);
        LocalDate today = LocalDate.now();
        List<Todo> todos = member.get().getTodos().stream()
                .filter(todo -> !todo.getStartDate().isAfter(today) &&
                                !todo.getEndDate().isBefore(today))
                .collect(Collectors.toList());
        return Optional.of(todos);
    }

    // Member 의 Todos 수정
    public Todo getUpdateTodosByOne(String username,Integer todoId,Todo todo){

        Todo maintodo = todoRepository.findById(todoId)
                        .orElseThrow(()-> new EntityNotFoundException("Todo not found"));

        if (todo.getTitle() != null) {
            maintodo.setTitle(todo.getTitle());
        }
        if (todo.getDescription() != null) {
            maintodo.setDescription(todo.getDescription());
        }
        if (todo.getStartDate() != null) {
            maintodo.setStartDate(todo.getStartDate());
        }
        if (todo.getEndDate() != null) {
            maintodo.setEndDate(todo.getEndDate());
        }
        if (todo.getCategoryId() != null ) {
            maintodo.setCategoryId(todo.getCategoryId());
        }
        return todoRepository.save(maintodo);
    }

    
    //Member 의 Todos 생성
    public Todo saveTodosByUsername(String username,Todo todo){
        // Member가 존재하는지 확인
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        // Todo에 Member 설정
        todo.setMember(member);
        return todoRepository.save(todo);
    }
    
    //Member 의 모든 Todos 조회
    public List<Todo> getTodosByUsername(String username){
        Optional<Member> member = memberRepository.findByUsername(username);
        return member.get().getTodos();
    }
    
    //모두 조회
    public List<Todo> getAllTodos(){
        return todoRepository.findAll();
    }

    public void deleteTodoById(Integer todoId) {
        todoRepository.deleteById(todoId);
    }
}
