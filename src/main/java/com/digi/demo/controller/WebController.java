package com.digi.demo.controller;

import com.digi.demo.entity.User; // Import your User class
import com.digi.demo.service.UserService; // Import your UserService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class WebController {

    @Autowired
    private UserService userService; // Inject UserService

    @GetMapping("/")
    public RedirectView home() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return new RedirectView("/dashboard");
        } else {
            return new RedirectView("/register");
        }
    }

    @GetMapping("/login")
    public String login() {
        return "pages/login";
    }

    @GetMapping("/register")
    public String register() {
        return "pages/register";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "pages/dashboard";
    }

 @GetMapping("/profile")
 public String profilePage(Model model) {
     Authentication auth = SecurityContextHolder.getContext().getAuthentication();
     if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
         // Create guest user for unauthenticated access
         User guestUser = new User();
         guestUser.setUsername("Guest");
         guestUser.setEmail("guest@example.com");
         guestUser.setFollowersCount(0);
         guestUser.setFollowingCount(0);
         model.addAttribute("user", guestUser);
     } else {
         User user = userService.findByUsername(auth.getName());
         if (user == null) {
             // Fallback if authenticated user not found in database
             User fallbackUser = new User();
             fallbackUser.setUsername(auth.getName());
             fallbackUser.setEmail("unknown@example.com");
             fallbackUser.setFollowersCount(0);
             fallbackUser.setFollowingCount(0);
             model.addAttribute("user", fallbackUser);
         } else {
             model.addAttribute("user", user);
         }
     }
     return "pages/profile";
 }

    @GetMapping("/store")
    public String store() {
        return "pages/store";
    }

    @GetMapping("/posts")
    public String posts() {
        return "pages/posts";
    }

    @GetMapping("/friends")
    public String friends() {
        return "pages/friends";
    }
}
