package com.optiday_min.optiday.service;

import com.optiday_min.optiday.domain.Comment;
import com.optiday_min.optiday.domain.Todo;
import com.optiday_min.optiday.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment addComment(Long todoId, String content) {
        try {
            // Todos 조회하지 않고 참조만 설정
            Todo todoRef = new Todo();
            todoRef.setId(todoId);

            Comment comment = new Comment(content, todoRef);
            return commentRepository.save(comment);

        } catch (DataIntegrityViolationException e) {
            // 존재하지 않는 todoId일 경우 DB 무결성 오류 발생
            throw new IllegalArgumentException("존재하지 않는 Todo ID입니다.");
        } catch (Exception e) {
            // 기타 예외 처리
            throw new RuntimeException("댓글 저장 중 오류가 발생했습니다.", e);
        }
    }

    //  Comment 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

}
