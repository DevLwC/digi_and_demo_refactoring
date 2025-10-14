// src/main/java/com/digi/demo/controller/CommunityNoteController.java
package com.digi.demo.controller;

import com.digi.demo.entity.CommunityNote;
import com.digi.demo.entity.NoteStatus;
import com.digi.demo.entity.Post;
import com.digi.demo.entity.User;
import com.digi.demo.repository.CommunityNoteRepository;
import com.digi.demo.service.AIValidationService;
import com.digi.demo.service.CommunityNoteService;
import com.digi.demo.service.PostService;
import com.digi.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class CommunityNoteController {
    @Autowired
    private CommunityNoteService noteService;
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;
    @Autowired
    private AIValidationService aiValidationService;
    @Autowired
    private CommunityNoteRepository noteRepository;

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommunityNote>> getNotesByPost(@PathVariable Long postId) {
        Post post = postService.getPostById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(noteService.getNotesByPost(post));
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitNote(
            @RequestParam Long postId,
            @RequestParam String content,
            @RequestParam String authorUsername) {
        try {
            var validatePost = aiValidationService.validateContent(content);
            var validateFacts = aiValidationService.validateFactAccuracy(content);

            if (!validatePost.isValid() || !validateFacts.isValid()) {
                throw new IllegalArgumentException("Post content is not valid: " + String.join(", ", validatePost.getViolationReasons()) + "; " + String.join(", ", validateFacts.getViolationReasons()));
            }

            Post post = postService.getPostById(postId);
            User author = userService.findByUsername(authorUsername);
            CommunityNote note = noteService.createNote(post, author, content);
            return ResponseEntity.ok(note);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
//TODO. add restriction to vote multiple times on one note
    @PostMapping("/{noteId}/vote")
    public ResponseEntity<?> vote(
            @PathVariable Long noteId,
            @RequestParam String voterUsername,
            @RequestParam boolean helpful) {
        try {
            User voter = userService.findByUsername(voterUsername);
            if (helpful) {
                noteService.voteHelpful(noteId, voter);
            } else {
                noteService.voteNotHelpful(noteId, voter);
            }
            return ResponseEntity.ok().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<CommunityNote>> getPendingNotes() {
        return ResponseEntity.ok(noteService.getPendingNotes());
    }

    @GetMapping("/post/{postId}/all")
    public ResponseEntity<List<CommunityNote>> getAllNotesByPost(@PathVariable Long postId) {
        Post post = postService.getPostById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(noteRepository.findByPost(post));
    }

}
