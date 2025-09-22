package com.digi.demo.repository;

import com.digi.demo.entity.User;
import com.digi.demo.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthorInOrderByCreatedAtDesc(List<User> authors);
    @Query("SELECT p FROM Post p WHERE p.author NOT IN :authors ORDER BY p.createdAt DESC")
    List<Post> findPostsNotByFriends(@Param("authors") List<User> authors);
}
