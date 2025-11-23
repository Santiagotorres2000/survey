package com.tspcompany.survey.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "company")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    private String nit;

    private String address;

    @OneToMany(mappedBy = "company")
    private List<Person> people;

    @OneToMany(mappedBy = "company")
    private List<Survey> surveys;
}
   
   
