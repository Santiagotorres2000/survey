package com.tspcompany.survey.service;
import com.tspcompany.survey.entity.Company;
import com.tspcompany.survey.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CompanyService {
    
 private final CompanyRepository companyRepository;

    public Company create(Company company) {
        return companyRepository.save(company);
    }

    public Company findById(Long id) {
        return companyRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));
    }

    public List<Company> findAll() {
        return companyRepository.findAll();
    }
}
