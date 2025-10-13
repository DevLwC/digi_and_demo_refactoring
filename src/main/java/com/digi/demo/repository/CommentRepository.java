package com.digi.demo.repository;

import com.digi.demo.entity.Comment;
import com.digi.demo.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostOrderByLikeCountDesc(Post post);
}
