package com.tspcompany.survey.entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "person")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Person<company> {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    @Column(nullable = false)
    private String role; 

    @Column(nullable = false)
    private String status = "ACTIVO"; // ACTIVO / INACTIVO

    @Column(nullable = false)
    private String passwordHash;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}
