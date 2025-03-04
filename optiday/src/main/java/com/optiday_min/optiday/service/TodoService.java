package com.optiday_min.optiday.service;

import com.optiday_min.optiday.domain.Comment;
import com.optiday_min.optiday.dto.CommentResponse;
import com.optiday_min.optiday.dto.TodoRequest;
import com.optiday_min.optiday.dto.TodoResponse;
import com.optiday_min.optiday.domain.Category;
import com.optiday_min.optiday.domain.Member;
import com.optiday_min.optiday.domain.Todo;
import com.optiday_min.optiday.repository.TodoRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final static Logger logger = LoggerFactory.getLogger(TodoService.class);
    @PersistenceContext
    private EntityManager entityManager; //EntityManage 주입
    private final MemberService memberService;
    private final CommentService commentService;
    private final TodoRepository todoRepository;


    //Member 의 모든 task 조회
    public List<TodoResponse> getTodosByMemberId(Long memberId){
        Member member = memberService.getMemberIdForMember(memberId);
        return todoRepository.findAllByMember(member).stream()
                .map(todo ->{
                    Long categoryId = todo.getCategory() != null ? todo.getCategory().getId() : null;
                    return TodoResponse.builder()
                            .id(todo.getId())
                            .title(todo.getTitle())
                            .description(todo.getDescription())
                            .startDate(todo.getStartDate())
                            .endDate(todo.getEndDate())
                            .isCompleted(todo.isCompleted())
                            .categoryId(categoryId != null ? Math.toIntExact(categoryId) : null) //null 체크 추가
                            .build();
                })
                .collect(Collectors.toList());
    }


    //Member 의 task 생성
    public TodoResponse saveTodo(Long memberId,TodoRequest todoRequest){
        try {
            Member memberRef = entityManager.getReference(Member.class, memberId);
            // 빌더 패턴을 이용해 TodoRequest -> TodoEntity 변환
            Todo todo = Todo.builder()
                    .title(todoRequest.getTitle())
                    .description(todoRequest.getDescription())
                    .startDate(todoRequest.getStartDate())
                    .endDate(todoRequest.getEndDate())
                    .member(memberRef)
                    .category(getCategoryById(todoRequest.getCategoryId()))  // Category는 categoryId를 통해 조회 TODO Category 예외 추가하기
                    .build();
            todoRepository.save(todo);

            return TodoResponse.from(todo);
        } catch (EntityNotFoundException e) {
            throw new IllegalArgumentException("Member with ID " + memberId + " not found.");
        }
    }

    // Member 의 task 수정
    public TodoResponse updateTodo(Long todoId, TodoRequest request){
        Todo existingTodo = todoRepository.findById(todoId)
                .orElseThrow(()-> new EntityNotFoundException("Todo not found"));
        existingTodo.setTitle(request.getTitle());
        existingTodo.setDescription(request.getDescription());
        existingTodo.setStartDate(request.getStartDate());
        existingTodo.setEndDate(request.getEndDate());
        existingTodo.setCategory(getCategoryById(request.getCategoryId()));
        todoRepository.save(existingTodo);

        return TodoResponse.from(existingTodo);
    }

    //task 삭제
    public void deleteTodo(Long todoId) {
        todoRepository.deleteById(todoId);
    }

    public void removeCategoryFromTodos(Category category){
        //삭제하는 Category에 속한 task의 카테고리 null 설정
        List<Todo> todos = todoRepository.findByCategory(category);
        for(Todo todo:todos){
            todo.setCategory(null);
        }
        todoRepository.saveAll(todos);
    }


    private Category getCategoryById(Integer categoryId) {
        if (categoryId != null) {
            return entityManager.getReference(Category.class, categoryId);
        }
        return null;
    }

/*    // Member 오늘 task 찾기
    public Optional<List<Todo>> getTodayTodosByEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        LocalDate today = LocalDate.now();
        List<Todo> todos = member.get().getTodos().stream()
                .filter(todo -> !todo.getStartDate().isAfter(today) &&
                                !todo.getEndDate().isBefore(today))
                .collect(Collectors.toList());
        return Optional.of(todos);
    }*/
}
