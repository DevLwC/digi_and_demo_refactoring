package com.digi.demo.service;

import com.digi.demo.entity.CommunityNote;
import com.digi.demo.entity.NoteStatus;
import com.digi.demo.entity.Post;
import com.digi.demo.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CommunityNoteServiceTest {

    @Autowired
    private CommunityNoteService noteService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Test
    void testNoteCreationAndRetrieval() {
        // Create test users
        User postAuthor = userService.registerUser("testuser1", "pass123", "test1@example.com");
        User noteAuthor = userService.registerUser("testuser2", "pass123", "test2@example.com");

        // Create a post
        Post post = postService.createPost(postAuthor, "Test post content", null);

        // Create a note
        CommunityNote note = noteService.createNote(post, noteAuthor, "This needs context because...");

        // Verify the note
        assertNotNull(note.getId());
        assertEquals("This needs context because...", note.getContent());
        assertEquals(noteAuthor, note.getAuthor());
        assertEquals(NoteStatus.PENDING, note.getStatus());

        // Test note retrieval
        var notes = noteService.getNotesByPost(post);
        assertTrue(notes.isEmpty());
    }

    @Test
    void testVoting() {
        // Setup
        User postAuthor = userService.registerUser("voter1", "pass123", "voter1@example.com");
        User noteAuthor = userService.registerUser("voter2", "pass123", "voter2@example.com");
        User voter = userService.registerUser("voter3", "pass123", "voter3@example.com");

        Post post = postService.createPost(postAuthor, "Content to be fact-checked", null);
        CommunityNote note = noteService.createNote(post, noteAuthor, "Fact check note");

        // Test voting
        noteService.voteHelpful(note.getId(), voter);
        assertEquals(1, note.getHelpfulVotes());

        // Test voting on own note
        assertThrows(IllegalStateException.class, () -> {
            noteService.voteHelpful(note.getId(), noteAuthor);
        });
    }
}
