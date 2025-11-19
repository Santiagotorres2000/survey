package com.tspcompany.survey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tspcompany.survey.entity.Respondent;

@Repository
public interface RespondentRepository extends JpaRepository<Respondent, Long> {

}
