package com.tspcompany.survey.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tspcompany.survey.entity.Company;
import com.tspcompany.survey.entity.OptionItem;
import com.tspcompany.survey.entity.Question;
import com.tspcompany.survey.entity.Survey;
import com.tspcompany.survey.repository.CompanyRepository;
import com.tspcompany.survey.repository.OptionItemRepository;
import com.tspcompany.survey.repository.QuestionRepository;
import com.tspcompany.survey.repository.SurveyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final CompanyRepository companyRepository;
    private final QuestionRepository questionRepository;
    private final OptionItemRepository optionItemRepository;

   
    public Survey createSurvey(Long companyId, String title, String description) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("La empresa no existe"));

        Survey survey = Survey.builder()
                .title(title)
                .description(description)
                .company(company)
                .build();

        return surveyRepository.save(survey);
    }

  
    public Question addQuestion(Long surveyId, String text, String type) {

        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new RuntimeException("Encuesta no encontrada"));

        Question question = Question.builder()
                .text(text)
                .type(type)
                .survey(survey)
                .build();

        return questionRepository.save(question);
    }


    public OptionItem addOption(Long questionId, String label) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));

        OptionItem option = OptionItem.builder()
                .label(label)
                .question(question)
                .build();

        return optionItemRepository.save(option);
    }


    public Survey getSurvey(Long surveyId) {

        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new RuntimeException("Encuesta no encontrada"));

        // carga preguntas
        List<Question> questions = questionRepository.findBySurvey(survey);

        // cargar opciones
        questions.forEach(q -> {
            List<OptionItem> options = optionItemRepository.findByQuestion(q);
            q.setSurvey(survey); // referencia correcta
        });

        return survey;
    }

    public List<Survey> getSurveysByCompany(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));

        return surveyRepository.findAll()
                .stream()
                .filter(s -> s.getCompany().getId() == companyId)
                .toList();
    }
}
