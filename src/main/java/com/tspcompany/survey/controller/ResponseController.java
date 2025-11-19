package com.tspcompany.survey.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tspcompany.survey.entity.Response;
import com.tspcompany.survey.entity.Respondent;
import com.tspcompany.survey.service.ResponseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/response")
@RequiredArgsConstructor
public class ResponseController {

    private final ResponseService responseService;


    @PostMapping("/respondent")
    public ResponseEntity<Respondent> createRespondent(
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String email
    ) {
        return ResponseEntity.ok(responseService.getOrCreateRespondent(phone, email));
    }

    
    @PostMapping("/text")
    public ResponseEntity<Response> saveTextResponse(
            @RequestParam Long questionId,
            @RequestParam Long respondentId,
            @RequestParam String text
    ) {
        return ResponseEntity.ok(responseService.saveTextResponse(questionId, respondentId, text));
    }

  
 
    @PostMapping("/option")
    public ResponseEntity<Response> saveOptionResponse(
            @RequestParam Long questionId,
            @RequestParam Long respondentId,
            @RequestParam Long optionId
    ) {
        return ResponseEntity.ok(responseService.saveOptionResponse(questionId, respondentId, optionId));
    }

   
    @GetMapping("/{respondentId}")
    public ResponseEntity<?> getResponses(@PathVariable Long respondentId) {
        return ResponseEntity.ok(responseService.getResponsesByRespondent(respondentId));
    }
}

