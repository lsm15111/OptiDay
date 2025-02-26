package com.optiday_min.optiday.repository;

import com.optiday_min.optiday.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByTodoId(Long todoId);

    @Query("SELECT c FROM Comment c JOIN FETCH c.member WHERE c.todo.id = :todoId")
    List<Comment> findByTodoIdWithMember(@Param("todoId") Long todoId);
}
