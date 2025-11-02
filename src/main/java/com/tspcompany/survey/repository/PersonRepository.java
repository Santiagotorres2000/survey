package com.tspcompany.survey.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tspcompany.survey.entity.Person;
import java.util.List;


@Repository
public interface PersonRepository extends JpaRepository<Person, Long>{
    Optional<Person> findByEmail(String email);
    
}
