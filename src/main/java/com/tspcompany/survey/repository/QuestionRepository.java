package com.tspcompany.survey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tspcompany.survey.entity.Question;
import com.tspcompany.survey.entity.Survey;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findBySurvey(Survey survey);
}

