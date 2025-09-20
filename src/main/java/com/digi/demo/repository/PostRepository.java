package com.digi.demo.repository;

import com.digi.demo.entity.User;
import com.digi.demo.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthorInOrderByCreatedAtDesc(List<User> authors);
    List<Post> findByAuthorNotInOrderByCreatedAtDesc(List<User> authors);
}
