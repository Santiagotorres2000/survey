package com.tspcompany.survey.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "question")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(name = "survey_id", nullable = false)
    private Survey survey;

    @Column(nullable = false)
    private String type;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<OptionItem> options;

    @OneToMany(mappedBy = "question")
    private List<Response> responses;
}
