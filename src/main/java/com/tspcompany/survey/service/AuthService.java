package com.tspcompany.survey.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.tspcompany.survey.dto.AuthRequest;
import com.tspcompany.survey.dto.AuthResponse;
import com.tspcompany.survey.dto.RegisterPersonRequest;
import com.tspcompany.survey.entity.Company;
import com.tspcompany.survey.entity.Person;
import com.tspcompany.survey.repository.CompanyRepository;
import com.tspcompany.survey.repository.PersonRepository;
import com.tspcompany.survey.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PersonRepository personRepository;
    private final CompanyRepository companyRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterPersonRequest req) {
        Company company = companyRepository.findById(req.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));

        if (personRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email ya registrado");
        }

        Person p = Person.builder()
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .role(req.getRole())
                .company(company)
                .status("ACTIVO")
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .build();

        personRepository.save(p);
        return new AuthResponse(jwtUtil.generateToken(p.getEmail()), p.getCompany().getId(), p.getRole());
    }

    public AuthResponse login(AuthRequest req) {
        Person p = personRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!"ACTIVO".equalsIgnoreCase(p.getStatus())) {
            throw new RuntimeException("Usuario inactivo");
        }

        if (!passwordEncoder.matches(req.getPassword(), p.getPasswordHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return new AuthResponse(jwtUtil.generateToken(p.getEmail()), p.getCompany().getId(), p.getRole());
    }
}