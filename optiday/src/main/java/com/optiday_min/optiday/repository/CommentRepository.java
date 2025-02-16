package com.optiday_min.optiday.repository;

import com.optiday_min.optiday.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
