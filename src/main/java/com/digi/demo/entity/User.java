package com.digi.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(columnDefinition = "integer default 0")
    private int followersCount = 0;

    @Column(columnDefinition = "integer default 0")
    private int followingCount = 0;

    // Constructors
    public User() {}

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Getters and Setters
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
}


