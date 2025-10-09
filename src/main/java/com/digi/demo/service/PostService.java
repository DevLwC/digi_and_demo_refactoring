package com.digi.demo.service;

import com.digi.demo.entity.Post;
import com.digi.demo.entity.User;
import com.digi.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post createPost(User author, String content, byte[] imageData) {
        Post post = new Post();
        post.setAuthor(author);
        post.setContent(content);
        post.setImageData(imageData);
        return postRepository.save(post);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public List<Post> getPostsByFriends(List<User> friends) {
        return postRepository.findByAuthorInOrderByCreatedAtDesc(friends);
    }

    public List<Post> getPostsByOthers(List<User> friends) {
        return postRepository.findPostsNotByFriends(friends);
    }

    public List<Post> getPostByUser(User user) {
        return postRepository.findByAuthorOrderByCreatedAtDesc(user);
    }
}
