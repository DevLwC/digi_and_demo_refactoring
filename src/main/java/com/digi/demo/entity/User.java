package com.digi.demo.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String createdAt;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    private String bio;

    @Column(columnDefinition = "integer default 0")
    private int followersCount = 0;

    @Column(columnDefinition = "integer default 0")
    private int followingCount = 0;

    private String location;

    private int streakCount = 0;

    private LocalDateTime lastLoginDate;

    // Constructors
    public User() {
        this.createdAt = LocalDate.now().format(DateTimeFormatter.ofPattern("MM/yyyy"));
        this.lastLoginDate = LocalDateTime.now();
        // the default location can be changed based on the ip adress, but that requires some extra backend work
        this.location = "Hamburg, DE";
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = LocalDate.now().format(DateTimeFormatter.ofPattern("MM/yyyy"));
        this.lastLoginDate = LocalDateTime.now();
        // the default location can be changed based on the ip adress, but that requires some extra backend work
        this.location = "Hamburg, DE";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getFollowersCount() { return followersCount; }
    public void setFollowersCount(int followersCount) { this.followersCount = followersCount; }

    public int getFollowingCount() { return followingCount; }
    public void setFollowingCount(int followingCount) { this.followingCount = followingCount; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt;}

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location;}

    public int getStreakCount() { return streakCount; }
    public void setStreakCount(int streakCount) { this.streakCount = streakCount; }

    public LocalDateTime getLastLoginDate() { return lastLoginDate; }
    public void setLastLoginDate(LocalDateTime lastLoginDate) { this.lastLoginDate = lastLoginDate;}
}


