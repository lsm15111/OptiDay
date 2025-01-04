package com.optiday_min.optiday.jpa;

import com.optiday_min.optiday.Todo.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo,Integer> {
}
