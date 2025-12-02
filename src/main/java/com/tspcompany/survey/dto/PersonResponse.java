package com.tspcompany.survey.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PersonResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String role;
    private Long companyId;
}
