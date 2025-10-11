package com.digi.demo.config;

import com.digi.demo.repository.AvatarImageRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.digi.demo.entity.AvatarImage;
import java.util.Map;
import java.nio.charset.StandardCharsets;

@Component
public class AvatarImageLoader {
    @Autowired
    private AvatarImageRepository avatarImageRepository;

    @PostConstruct
    public void loadAvatars() {
        Map<String, String> svgMap = Map.of(
                "fox", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"88\" height=\"88\" role=\"img\" aria-label=\"Fox avatar\"><circle cx=\"32\" cy=\"32\" r=\"30\" fill=\"#fff7f0\" stroke=\"#e67e22\" stroke-width=\"3\"/><path d=\"M20 24c2-6 10-10 12-10s10 4 12 10c0 8-4 18-12 18S20 32 20 24z\" fill=\"#f39c12\" stroke=\"#d35400\" stroke-width=\"2\"/><circle cx=\"26\" cy=\"28\" r=\"3\" fill=\"#2c3e50\"/><circle cx=\"38\" cy=\"28\" r=\"3\" fill=\"#2c3e50\"/><path d=\"M28 38c2 2 6 2 8 0\" stroke=\"#2c3e50\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M24 18l-6-6M40 18l6-6\" stroke=\"#d35400\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
                "cat", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"88\" height=\"88\" role=\"img\" aria-label=\"Cat avatar\"><circle cx=\"32\" cy=\"36\" r=\"24\" fill=\"#fff7f0\" stroke=\"#e67e22\" stroke-width=\"3\"/><ellipse cx=\"32\" cy=\"44\" rx=\"12\" ry=\"8\" fill=\"#f9d29d\"/><ellipse cx=\"24\" cy=\"36\" rx=\"3\" ry=\"4\" fill=\"#2c3e50\"/><ellipse cx=\"40\" cy=\"36\" rx=\"3\" ry=\"4\" fill=\"#2c3e50\"/><path d=\"M32 48c2 2 6 2 8 0\" stroke=\"#2c3e50\" stroke-width=\"2\" stroke-linecap=\"round\"/><polygon points=\"16,24 24,12 28,28\" fill=\"#f9d29d\" stroke=\"#e67e22\" stroke-width=\"2\"/><polygon points=\"48,24 40,12 36,28\" fill=\"#f9d29d\" stroke=\"#e67e22\" stroke-width=\"2\"/></svg>",
                "dog", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"88\" height=\"88\" role=\"img\" aria-label=\"Dog avatar\"><ellipse cx=\"32\" cy=\"36\" rx=\"22\" ry=\"20\" fill=\"#fff7f0\" stroke=\"#e67e22\" stroke-width=\"3\"/><ellipse cx=\"24\" cy=\"36\" rx=\"3\" ry=\"4\" fill=\"#2c3e50\"/><ellipse cx=\"40\" cy=\"36\" rx=\"3\" ry=\"4\" fill=\"#2c3e50\"/><ellipse cx=\"32\" cy=\"46\" rx=\"6\" ry=\"3\" fill=\"#f9d29d\"/><ellipse cx=\"12\" cy=\"24\" rx=\"6\" ry=\"12\" fill=\"#f9d29d\" stroke=\"#e67e22\" stroke-width=\"2\"/><ellipse cx=\"52\" cy=\"24\" rx=\"6\" ry=\"12\" fill=\"#f9d29d\" stroke=\"#e67e22\" stroke-width=\"2\"/></svg>",
                "rabbit", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"88\" height=\"88\" role=\"img\" aria-label=\"Rabbit avatar\"><ellipse cx=\"32\" cy=\"40\" rx=\"18\" ry=\"16\" fill=\"#fff7f0\" stroke=\"#e67e22\" stroke-width=\"3\"/><ellipse cx=\"24\" cy=\"44\" rx=\"3\" ry=\"4\" fill=\"#2c3e50\"/><ellipse cx=\"40\" cy=\"44\" rx=\"3\" ry=\"4\" fill=\"#2c3e50\"/><ellipse cx=\"32\" cy=\"52\" rx=\"6\" ry=\"3\" fill=\"#f9d29d\"/><rect x=\"22\" y=\"8\" width=\"6\" height=\"24\" rx=\"3\" fill=\"#fff7f0\" stroke=\"#e67e22\" stroke-width=\"2\"/><rect x=\"36\" y=\"8\" width=\"6\" height=\"24\" rx=\"3\" fill=\"#fff7f0\" stroke=\"#e67e22\" stroke-width=\"2\"/></svg>",
                "bear", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"88\" height=\"88\" role=\"img\" aria-label=\"Bear avatar\"><ellipse cx=\"32\" cy=\"36\" rx=\"20\" ry=\"18\" fill=\"#f9d29d\" stroke=\"#e67e22\" stroke-width=\"3\"/><ellipse cx=\"20\" cy=\"20\" rx=\"6\" ry=\"6\" fill=\"#f9d29d\" stroke=\"#e67e22\" stroke-width=\"2\"/><ellipse cx=\"44\" cy=\"20\" rx=\"6\" ry=\"6\" fill=\"#f9d29d\" stroke=\"#e67e22\" stroke-width=\"2\"/><ellipse cx=\"26\" cy=\"36\" rx=\"3\" ry=\"4\" fill=\"#2c3e50\"/><ellipse cx=\"38\" cy=\"36\" rx=\"3\" ry=\"4\" fill=\"#2c3e50\"/><ellipse cx=\"32\" cy=\"44\" rx=\"5\" ry=\"3\" fill=\"#fff7f0\"/></svg>",
                "panda", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"88\" height=\"88\" role=\"img\" aria-label=\"Panda avatar\"><ellipse cx=\"32\" cy=\"36\" rx=\"20\" ry=\"18\" fill=\"#fff\" stroke=\"#2c3e50\" stroke-width=\"3\"/><ellipse cx=\"18\" cy=\"20\" rx=\"7\" ry=\"9\" fill=\"#2c3e50\"/><ellipse cx=\"46\" cy=\"20\" rx=\"7\" ry=\"9\" fill=\"#2c3e50\"/><ellipse cx=\"24\" cy=\"36\" rx=\"5\" ry=\"7\" fill=\"#2c3e50\"/><ellipse cx=\"40\" cy=\"36\" rx=\"5\" ry=\"7\" fill=\"#2c3e50\"/><ellipse cx=\"32\" cy=\"44\" rx=\"5\" ry=\"3\" fill=\"#f9d29d\"/></svg>",
                "frog", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"88\" height=\"88\" role=\"img\" aria-label=\"Frog avatar\"><ellipse cx=\"32\" cy=\"40\" rx=\"18\" ry=\"14\" fill=\"#8fd18f\" stroke=\"#355c35\" stroke-width=\"3\"/><ellipse cx=\"20\" cy=\"28\" rx=\"6\" ry=\"6\" fill=\"#8fd18f\" stroke=\"#355c35\" stroke-width=\"2\"/><ellipse cx=\"44\" cy=\"28\" rx=\"6\" ry=\"6\" fill=\"#8fd18f\" stroke=\"#355c35\" stroke-width=\"2\"/><circle cx=\"20\" cy=\"28\" r=\"2\" fill=\"#2c3e50\"/><circle cx=\"44\" cy=\"28\" r=\"2\" fill=\"#2c3e50\"/><ellipse cx=\"32\" cy=\"48\" rx=\"8\" ry=\"3\" fill=\"#fff7f0\"/></svg>",
                "owl", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"88\" height=\"88\" role=\"img\" aria-label=\"Owl avatar\"><ellipse cx=\"32\" cy=\"40\" rx=\"18\" ry=\"16\" fill=\"#fff7f0\" stroke=\"#e67e22\" stroke-width=\"3\"/><ellipse cx=\"24\" cy=\"36\" rx=\"5\" ry=\"7\" fill=\"#fff\" stroke=\"#e67e22\" stroke-width=\"2\"/><ellipse cx=\"40\" cy=\"36\" rx=\"5\" ry=\"7\" fill=\"#fff\" stroke=\"#e67e22\" stroke-width=\"2\"/><circle cx=\"24\" cy=\"36\" r=\"2\" fill=\"#2c3e50\"/><circle cx=\"40\" cy=\"36\" r=\"2\" fill=\"#2c3e50\"/><polygon points=\"32,44 28,52 36,52\" fill=\"#e67e22\"/><polygon points=\"20,20 32,8 44,20\" fill=\"#fff7f0\" stroke=\"#e67e22\" stroke-width=\"2\"/></svg>"
        );
        svgMap.forEach((name, svg) -> {
            if (avatarImageRepository.findByName(name) == null) {
                AvatarImage avatar = new AvatarImage();
                avatar.setName(name);
                avatar.setImageData(svg.getBytes(StandardCharsets.UTF_8));
                avatarImageRepository.save(avatar);
            }
        });
    }
}
