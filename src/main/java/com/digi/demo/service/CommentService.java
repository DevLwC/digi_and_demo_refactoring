package com.digi.demo.service;

import com.digi.demo.entity.Comment;
import com.digi.demo.entity.CommentLike;
import com.digi.demo.entity.Post;
import com.digi.demo.entity.User;
import com.digi.demo.repository.CommentLikeRepository;
import com.digi.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentLikeRepository commentLikeRepository;

    public List<Comment> getCommentsByPost(Post post) {
        return commentRepository.findByPostOrderByLikeCountDesc(post);
    }

    public Comment addComment(Post post, User author, String content) {
        Comment comment = new Comment();
        comment.setPost(post);
        comment.setAuthor(author);
        comment.setContent(content);
        return commentRepository.save(comment);
    }

    public void likeComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        comment.setLikeCount(comment.getLikeCount() + 1);
        commentRepository.save(comment);
    }

    public void likeComment(Long commentId, User user) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        if (commentLikeRepository.existsByUserAndComment(user, comment)) {
            throw new IllegalStateException("Already liked");
        }
        CommentLike like = new CommentLike();
        like.setUser(user);
        like.setComment(comment);
        commentLikeRepository.save(like);
        comment.setLikeCount(commentLikeRepository.countByComment(comment));
        commentRepository.save(comment);
    }
}
