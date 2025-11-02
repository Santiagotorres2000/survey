package com.tspcompany.survey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tspcompany.survey.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

}
