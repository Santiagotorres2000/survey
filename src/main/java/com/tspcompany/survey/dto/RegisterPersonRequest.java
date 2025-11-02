package com.tspcompany.survey.dto;
import jakarta.validation.constraints.*;
import lombok.Data;
@Data

public class RegisterPersonRequest {
    @NotBlank
    private String firstName;
    private String lastName;
    @Email @NotBlank
    private String email;
    private String phone;
    @NotBlank
    private String role;
    @NotNull
    private Long companyId;
    @NotBlank 
    private String password;

    
}
