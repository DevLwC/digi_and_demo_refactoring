package com.digi.demo.repository;

import com.digi.demo.entity.CommunityNote;
import com.digi.demo.entity.NoteStatus;
import com.digi.demo.entity.Post;
import com.digi.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityNoteRepository extends JpaRepository<CommunityNote, Long> {
    List<CommunityNote> findByPostAndStatus(Post post, NoteStatus status);
    List<CommunityNote> findByStatus(NoteStatus status);
    boolean existsByPostAndAuthor(Post post, User author);
}
