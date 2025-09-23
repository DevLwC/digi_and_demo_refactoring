// src/main/java/com/digi/demo/service/CommunityNoteService.java
package com.digi.demo.service;

import com.digi.demo.entity.CommunityNote;
import com.digi.demo.entity.NoteStatus;
import com.digi.demo.entity.Post;
import com.digi.demo.entity.User;
import com.digi.demo.repository.CommunityNoteRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityNoteService {
    @Autowired
    private CommunityNoteRepository noteRepository;

    public CommunityNote createNote(Post post, User author, String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Note content cannot be empty");
        }

        // Check if author already submitted a note for this post
        if (noteRepository.existsByPostAndAuthor(post, author)) {
            throw new IllegalStateException("You have already submitted a note for this post");
        }

        CommunityNote note = new CommunityNote();
        note.setPost(post);
        note.setAuthor(author);
        note.setContent(content.trim());
        return noteRepository.save(note);
    }

    public List<CommunityNote> getNotesByPost(Post post) {
        return noteRepository.findByPostAndStatus(post, NoteStatus.APPROVED);
    }

    public List<CommunityNote> getPendingNotes() {
        return noteRepository.findByStatus(NoteStatus.PENDING);
    }

    @Transactional
    public void voteHelpful(Long noteId, User voter) {
        CommunityNote note = noteRepository.findById(noteId)
            .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        // Prevent voting on own notes
        if (note.getAuthor().equals(voter)) {
            throw new IllegalStateException("Cannot vote on your own note");
        }

        note.setHelpfulVotes(note.getHelpfulVotes() + 1);

        // Auto-approve note if it reaches threshold
        if (note.getHelpfulRatio() >= 0.8 && (note.getHelpfulVotes() + note.getNotHelpfulVotes()) >= 5) {
            note.setStatus(NoteStatus.APPROVED);
        }

        noteRepository.save(note);
    }

    @Transactional
    public void voteNotHelpful(Long noteId, User voter) {
        CommunityNote note = noteRepository.findById(noteId)
            .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        if (note.getAuthor().equals(voter)) {
            throw new IllegalStateException("Cannot vote on your own note");
        }

        note.setNotHelpfulVotes(note.getNotHelpfulVotes() + 1);

        // Auto-reject note if it reaches threshold
        if (note.getHelpfulRatio() <= 0.2 && (note.getHelpfulVotes() + note.getNotHelpfulVotes()) >= 5) {
            note.setStatus(NoteStatus.REJECTED);
        }

        noteRepository.save(note);
    }
}
