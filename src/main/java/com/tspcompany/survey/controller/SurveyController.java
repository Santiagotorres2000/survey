package com.tspcompany.survey.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tspcompany.survey.dto.CreateSurveyRequest;
import com.tspcompany.survey.service.SurveyService;
import com.tspcompany.survey.entity.Survey;
import com.tspcompany.survey.entity.Question;
import com.tspcompany.survey.entity.OptionItem;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/survey")
@RequiredArgsConstructor
public class SurveyController {

    private final SurveyService surveyService;

    @PostMapping
    public ResponseEntity<Survey> createSurvey(@RequestBody CreateSurveyRequest req) {
        Survey survey = surveyService.createSurvey(req.getCompanyId(), req.getTitle(), req.getDescription());
        return ResponseEntity.ok(survey);
    }

 
    @PostMapping("/{surveyId}/question")
    public ResponseEntity<Question> addQuestion(
            @PathVariable Long surveyId,
            @RequestParam String text,
            @RequestParam String type
    ) {
        Question q = surveyService.addQuestion(surveyId, text, type);
        return ResponseEntity.ok(q);
    }

    @PostMapping("/question/{questionId}/option")
    public ResponseEntity<OptionItem> addOption(
            @PathVariable Long questionId,
            @RequestParam String label
    ) {
        OptionItem opt = surveyService.addOption(questionId, label);
        return ResponseEntity.ok(opt);
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<Survey> getSurvey(@PathVariable Long surveyId) {
        return ResponseEntity.ok(surveyService.getSurvey(surveyId));
    }


    @GetMapping("/company/{companyId}")
    public ResponseEntity<?> listByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(surveyService.getSurveysByCompany(companyId));
    }
}

