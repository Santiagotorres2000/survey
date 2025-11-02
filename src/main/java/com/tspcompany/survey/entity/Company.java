package com.tspcompany.survey.entity;

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
            private long Id;

            @Column(nullable = false)
            private String name;
            private String nit;
            private String address;

    }

   
   
