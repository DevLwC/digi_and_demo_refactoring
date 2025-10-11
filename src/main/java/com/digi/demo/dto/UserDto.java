package com.digi.demo.dto;

public class UserDto {
    private Long Id;
    private String username;
    private String email;
    private String bio;
    private String createdAt;
    private String location;
    private int followersCount;
    private int followingCount;
    private Long avatarImageId;
    private int streakCount;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public String getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public int getFollowersCount() {
        return followersCount;
    }
    public void setFollowersCount(int followersCount) {
        this.followersCount = followersCount;
    }
    public int getFollowingCount() {
        return followingCount;
    }
    public void setFollowingCount(int followingCount) {
        this.followingCount = followingCount;
    }
    public Long getAvatarImageId() {
        return avatarImageId;
    }
    public void setAvatarImageId(Long avatarImageId) {
        this.avatarImageId = avatarImageId;
    }
    public int getStreakCount() {
        return streakCount;
    }
    public void setStreakCount(int streakCount) {
        this.streakCount = streakCount;
    }
}
