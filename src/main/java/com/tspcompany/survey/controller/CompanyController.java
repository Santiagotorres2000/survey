package com.tspcompany.survey.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tspcompany.survey.entity.Company;
import com.tspcompany.survey.service.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    

   
    @PostMapping
    public ResponseEntity<Company> create(@RequestBody Company company) {
        return ResponseEntity.ok(companyService.create(company));
    }

  
    @GetMapping("/{id}")
    public ResponseEntity<Company> findById(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.findById(id));
    }

  
    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(companyService.findAll());
    }
}

