package com.digi.demo.dto;

import com.digi.demo.entity.User;
import com.digi.demo.entity.Post;
import java.time.LocalDateTime;
import java.util.Base64;

public class PostDto {
    private Long id;
    private User author;
    private String content;
    private LocalDateTime createdAt;
    private String imageData; // base64
    private long likeCount;

    public PostDto(Post post, long likeCount) {
        this.id = post.getId();
        this.author = post.getAuthor();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.imageData = post.getImageData() != null ? Base64.getEncoder().encodeToString(post.getImageData()) : null;
        this.likeCount = likeCount;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public User getAuthor() {
        return author;
    }
    public void setAuthor(User author) {
        this.author = author;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public String getImageData() {
        return imageData;
    }
    public void setImageData(String imageData) {
        this.imageData = imageData;
    }
    public long getLikeCount() {
        return likeCount;
    }
    public void setLikeCount(long likeCount) {
        this.likeCount = likeCount;
    }
}
