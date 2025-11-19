package com.tspcompany.survey.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tspcompany.survey.entity.OptionItem;
import com.tspcompany.survey.entity.Question;
import com.tspcompany.survey.entity.Respondent;
import com.tspcompany.survey.entity.Response;
import com.tspcompany.survey.repository.OptionItemRepository;
import com.tspcompany.survey.repository.QuestionRepository;
import com.tspcompany.survey.repository.RespondentRepository;
import com.tspcompany.survey.repository.ResponseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResponseService {

    private final RespondentRepository respondentRepository;
    private final ResponseRepository responseRepository;
    private final QuestionRepository questionRepository;
    private final OptionItemRepository optionItemRepository;

    // Crear o recuperar según email o teléfono
    public Respondent getOrCreateRespondent(String phone, String email) {

        List<Respondent> existing = respondentRepository.findAll().stream()
                .filter(r -> (phone != null && phone.equals(r.getPhone())) ||
                             (email != null && email.equals(r.getEmail())))
                .toList();

        if (!existing.isEmpty()) {
            return existing.get(0);
        }

        Respondent r = Respondent.builder()
                .phone(phone)
                .email(email)
                .build();

        return respondentRepository.save(r);
    }

    // Guardar respuesta tipo texto
    public Response saveTextResponse(Long questionId, Long respondentId, String text) {

        Question q = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));

        Respondent respondent = respondentRepository.findById(respondentId)
                .orElseThrow(() -> new RuntimeException("Respondent no encontrado"));

        Response response = Response.builder()
                .question(q)
                .respondent(respondent)
                .answerText(text)
                .build();

        return responseRepository.save(response);
    }

    // Guardar opción seleccionada
    public Response saveOptionResponse(Long questionId, Long respondentId, Long optionId) {

        Question q = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));

        Respondent respondent = respondentRepository.findById(respondentId)
                .orElseThrow(() -> new RuntimeException("Respondent no encontrado"));

        OptionItem opt = optionItemRepository.findById(optionId)
                .orElseThrow(() -> new RuntimeException("Opción no encontrada"));

        Response response = Response.builder()
                .question(q)
                .respondent(respondent)
                .selectedOption(opt)
                .build();

        return responseRepository.save(response);
    }

    // Obtener todas las respuestas
    public List<Response> getResponsesByRespondent(Long respondentId) {
        Respondent respondent = respondentRepository.findById(respondentId)
                .orElseThrow(() -> new RuntimeException("Respondent no encontrado"));

        return responseRepository.findByRespondent(respondent);
    }
}
