package com.tspcompany.survey.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "response")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "respondent_id", nullable = false)
    private Respondent respondent;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    private String answerText;

    @ManyToOne
    @JoinColumn(name = "option_item_id")
    private OptionItem selectedOption;

    private LocalDateTime respondedAt = LocalDateTime.now();
}


