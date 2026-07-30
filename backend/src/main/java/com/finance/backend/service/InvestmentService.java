package com.finance.backend.service;

import com.finance.backend.entity.Investment;
import com.finance.backend.entity.User;
import com.finance.backend.repository.InvestmentRepository;
import com.finance.backend.repository.UserRepository;
import com.finance.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvestmentService {

    private final InvestmentRepository investmentRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Investment> getAllInvestments() {
        return investmentRepository.findByUserId(getCurrentUser().getId());
    }

    public Investment addInvestment(Investment investment) {
        investment.setUser(getCurrentUser());
        return investmentRepository.save(investment);
    }

    public Investment updateInvestment(Long id, Investment updatedInvestment) {
        Investment investment = investmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Investment not found"));

        if (!investment.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        investment.setInvestmentType(updatedInvestment.getInvestmentType());
        investment.setInvestmentName(updatedInvestment.getInvestmentName());
        investment.setInvestedAmount(updatedInvestment.getInvestedAmount());
        investment.setCurrentValue(updatedInvestment.getCurrentValue());
        investment.setProfitLoss(updatedInvestment.getProfitLoss());

        return investmentRepository.save(investment);
    }

    public void deleteInvestment(Long id) {
        Investment investment = investmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Investment not found"));

        if (!investment.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        investmentRepository.delete(investment);
    }
}
