package com.digi.demo.repository;

import com.digi.demo.entity.Comment;
import com.digi.demo.entity.CommentLike;
import com.digi.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    boolean existsByUserAndComment(User user, Comment comment);
    int countByComment(Comment comment);
}
