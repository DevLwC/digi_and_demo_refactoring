package com.digi.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    // Forward any routes not matched by other controllers to the React app
    @GetMapping(value = {"/", "/login", "/register", "/dashboard", "/profile", "/store", "/friends", "/posts"})
    public String forward() {
        return "forward:/index.html";
    }
}
