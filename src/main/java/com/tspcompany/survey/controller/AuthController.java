package com.tspcompany.survey.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tspcompany.survey.dto.AuthRequest;
import com.tspcompany.survey.dto.AuthResponse;
import com.tspcompany.survey.dto.RegisterPersonRequest;
import com.tspcompany.survey.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

  
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
}
