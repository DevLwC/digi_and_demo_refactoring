// src/main/java/com/digi/demo/entity/CommunityNote.java
package com.digi.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

// src/main/java/com/digi/demo/entity/CommunityNote.java
@Entity
@Table(name = "community_notes")
public class CommunityNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    @Column(length = 1000)
    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    private int helpfulVotes = 0;
    private int notHelpfulVotes = 0;

    @Enumerated(EnumType.STRING)
    private NoteStatus status = NoteStatus.PENDING;

    // Calculate helpful ratio for sorting
    public double getHelpfulRatio() {
        int total = helpfulVotes + notHelpfulVotes;
        return total == 0 ? 0 : (double) helpfulVotes / total;
    }

    // Existing getters and setters...

        // Simple getters and setters like your Post entity
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public Post getPost() { return post; }
        public void setPost(Post post) { this.post = post; }

        public User getAuthor() { return author; }
        public void setAuthor(User author) { this.author = author; }

        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }

        public LocalDateTime getCreatedAt() { return createdAt; }

        public int getHelpfulVotes() { return helpfulVotes; }
        public void setHelpfulVotes(int helpfulVotes) { this.helpfulVotes = helpfulVotes; }

        public int getNotHelpfulVotes() { return notHelpfulVotes; }
        public void setNotHelpfulVotes(int notHelpfulVotes) { this.notHelpfulVotes = notHelpfulVotes; }

        public NoteStatus getStatus() { return status; }
        public void setStatus(NoteStatus status) { this.status = status; }
}
