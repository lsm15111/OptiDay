package com.optiday_min.optiday.service;

import com.optiday_min.optiday.controller.TodoController;
import com.optiday_min.optiday.domain.Comment;
import com.optiday_min.optiday.domain.Member;
import com.optiday_min.optiday.domain.Todo;
import com.optiday_min.optiday.dto.CommentRequest;
import com.optiday_min.optiday.dto.CommentResponse;
import com.optiday_min.optiday.exception.PermissionDeniedException;
import com.optiday_min.optiday.repository.CommentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.PermissionDeniedDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final static Logger logger = LoggerFactory.getLogger(CommentService.class);
    private final CommentRepository commentRepository;
    private final EntityManager entityManager;
    
//    // 일정의 댓글 List 조회
//    public List<CommentResponse> getCommentsForTodo() {
//
//    }

    // Comment 추가
    public CommentResponse addComment(Long memberId, Long todoId, CommentRequest commentRequest) {
        try {
            // 조회하지 않고 참조만 설정
            Todo todoRef = entityManager.getReference(Todo.class,todoId);
            Member memberRef = entityManager.getReference(Member.class,memberId);

            Comment comment = new Comment(commentRequest.getComment(), todoRef,memberRef);
            commentRepository.save(comment);

            return toCommentResponse(comment,memberId);
        } catch (Exception e) {
            // 기타 예외 처리
            throw new RuntimeException("댓글 저장 중 오류가 발생했습니다.", e);
        }
    }
    // Comment 수정
    public CommentResponse updateComment(Long memberId, Long commentId, CommentRequest commentRequest) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment Not Found"));
        if(!comment.getMember().getId().equals(memberId)) {
            throw new PermissionDeniedException("수정 권한이 없습니다.");
        }
        comment.setComment(commentRequest.getComment());
        commentRepository.save(comment);
        CommentResponse response = toCommentResponse(comment,memberId);
        return response;
    }

    public List<Comment> getCommentByTodoId(Long todoId) {
        List<Comment> comments = commentRepository.findByTodoIdWithMember(todoId);
        return comments;
    }

    public CommentResponse toCommentResponse(Comment comment,Long memberId) {
        return CommentResponse.builder()
                .id(comment.getId())
                .comment(comment.getComment())
                .username(comment.getMember().getUsername())
                .isOwner(comment.getMember().getId().equals(memberId))
                .createdAt(comment.getCreatedAt())
                .build();
    }
    public List<CommentResponse> getCommentResponsesByTodoId(Long todoId,Long memberId) {
        List<Comment> comments = getCommentByTodoId(todoId);
        return comments.stream()
                .map(comment -> toCommentResponse(comment,memberId))
                .collect(Collectors.toList());
    }

    //  Comment 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }


}
