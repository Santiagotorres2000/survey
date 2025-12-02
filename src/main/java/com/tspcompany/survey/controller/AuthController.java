package com.tspcompany.survey.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tspcompany.survey.dto.AuthRequest;
import com.tspcompany.survey.dto.AuthResponse;
import com.tspcompany.survey.dto.RegisterPersonRequest;
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
        AuthResponse response = authService.register(req);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {
        AuthResponse response = authService.login(req);
        return ResponseEntity.ok(response);
    }
}
