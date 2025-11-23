package com.tspcompany.survey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tspcompany.survey.entity.Response;
import com.tspcompany.survey.entity.Respondent;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Long> {

    List<Response> findByRespondent(Respondent respondent);
}

