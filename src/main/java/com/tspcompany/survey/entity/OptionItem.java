package com.tspcompany.survey.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "option_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OptionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String label;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
}

