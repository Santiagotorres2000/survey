package com.tspcompany.survey.config;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.tspcompany.survey.repository.PersonRepository;
import com.tspcompany.survey.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final PersonRepository personRepository;

    public JwtFilter(JwtUtil jwtUtil, PersonRepository personRepository) {
        this.jwtUtil = jwtUtil;
        this.personRepository = personRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {

        try {
            // Revisar Authorization header si hay token
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                if (jwtUtil.validateToken(token)) {
                    String email = jwtUtil.extractUsername(token);
                    var opt = personRepository.findByEmail(email);
                    if (opt.isPresent()) {
                        var person = opt.get();
                        var authorities = List.of(new SimpleGrantedAuthority(person.getRole()));
                        var auth = new UsernamePasswordAuthenticationToken(email, null, authorities);
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            }
        } catch (Exception e) {
            // Token inválido - permitir que Spring Security maneje la protección
        }

        // Continuar con la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
