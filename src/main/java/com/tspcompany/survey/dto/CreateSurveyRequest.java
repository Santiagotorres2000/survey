package com.tspcompany.survey.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateSurveyRequest {

    @NotNull
    private Long companyId;

    @NotBlank
    private String title;

    private String description;
}

