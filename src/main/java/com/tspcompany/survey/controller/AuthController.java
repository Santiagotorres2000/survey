package com.tspcompany.survey.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import com.tspcompany.survey.dto.AuthRequest;
import com.tspcompany.survey.dto.AuthResponse;
import com.tspcompany.survey.dto.RegisterPersonRequest;
import com.tspcompany.survey.dto.PersonResponse;
import com.tspcompany.survey.entity.Person;
import com.tspcompany.survey.repository.PersonRepository;
import com.tspcompany.survey.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final PersonRepository personRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterPersonRequest req) {
        String jwt = authService.register(req);
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {
        String jwt = authService.login(req);
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @GetMapping("/me")
    public ResponseEntity<PersonResponse> me() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Person p = personRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        PersonResponse resp = new PersonResponse(
                p.getId(), p.getFirstName(), p.getLastName(), p.getEmail(), p.getPhone(), p.getRole(), p.getCompany() != null ? p.getCompany().getId() : null
        );

        return ResponseEntity.ok(resp);
    }
}
