package com.tspcompany.survey.dto;
import lombok.Data;
import java.util.List;

@Data
public class SurveyDto {
    private Long id;
    private String title;
    private String description;
    private List<QuestionDto> questions;
}

@Data
class QuestionDto {
    private Long id;
    private String text;
    private String type;
    private List<String> options;
}

