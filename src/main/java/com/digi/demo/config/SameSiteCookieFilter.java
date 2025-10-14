package com.digi.demo.config;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.Collection;

@Component
public class SameSiteCookieFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        chain.doFilter(request, response);
        if (response instanceof HttpServletResponse) {
            HttpServletResponse res = (HttpServletResponse) response;
            Collection<String> headers = res.getHeaders("Set-Cookie");
            boolean firstHeader = true;
            for (String header : headers) {
                String updatedHeader = header;
                if (!header.toLowerCase().contains("samesite")) {
                    updatedHeader = header + "; SameSite=None; Secure";
                }
                if (firstHeader) {
                    res.setHeader("Set-Cookie", updatedHeader);
                    firstHeader = false;
                } else {
                    res.addHeader("Set-Cookie", updatedHeader);
                }
            }
        }
    }
}
