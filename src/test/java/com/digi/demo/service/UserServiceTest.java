package com.digi.demo.service;

import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void testUserRegistration() {
        User user = userService.registerUser("testuser", "password123", "test@example.com");

        assertNotNull(user.getId());
        assertEquals("testuser", user.getUsername());
        assertEquals("test@example.com", user.getEmail());
        assertNotEquals("password123", user.getPassword()); // Password should be encoded
    }

    @Test
    void testDuplicateUsernameThrowsException() {
        userService.registerUser("duplicate", "password123", "test1@example.com");

        assertThrows(RuntimeException.class, () -> {
            userService.registerUser("duplicate", "password456", "test2@example.com");
        });
    }

    @Test
    void testFindByUsername() {
        userService.registerUser("findme", "password123", "findme@example.com");

        User found = userService.findByUsername("findme");
        assertNotNull(found);
        assertEquals("findme", found.getUsername());
    }
}
