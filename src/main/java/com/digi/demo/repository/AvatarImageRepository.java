package com.digi.demo.repository;

import com.digi.demo.entity.AvatarImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarImageRepository extends JpaRepository<AvatarImage, Long> {
    AvatarImage findByName(String name);
    AvatarImage findById(long id);
}
