package com.optiday_min.optiday.jpa;

import com.optiday_min.optiday.entity.Category;
import com.optiday_min.optiday.entity.Member;
import com.optiday_min.optiday.entity.Todo;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo,Long> {
    List<Todo> findByCategory(Category category);
    List<Todo> findByMember(Member member);
    @EntityGraph(attributePaths = {"category"}) // N+1 문제 해결
    List<Todo> findAllByMember(Member member);
}
