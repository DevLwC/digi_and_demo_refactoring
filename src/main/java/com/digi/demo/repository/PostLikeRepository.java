package com.digi.demo.repository;

import com.digi.demo.entity.Post;
import com.digi.demo.entity.User;
import com.digi.demo.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    long countByPost(Post post);
    boolean existsByUserAndPost(User user, Post post);
}
