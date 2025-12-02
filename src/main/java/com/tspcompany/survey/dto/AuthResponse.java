package com.tspcompany.survey.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long companyId;
    private String role;
}
