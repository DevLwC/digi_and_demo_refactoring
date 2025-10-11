package com.digi.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "avatar_images")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AvatarImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Lob
    private byte[] imageData;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public byte[] getImageData() {
        return imageData;
    }
    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}
