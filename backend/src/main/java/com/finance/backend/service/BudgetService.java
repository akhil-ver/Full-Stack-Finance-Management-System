package com.finance.backend.service;

import com.finance.backend.entity.Budget;
import com.finance.backend.entity.User;
import com.finance.backend.repository.BudgetRepository;
import com.finance.backend.repository.UserRepository;
import com.finance.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Budget> getAllBudgets() {
        return budgetRepository.findByUserId(getCurrentUser().getId());
    }

    public Budget addBudget(Budget budget) {
        budget.setUser(getCurrentUser());
        return budgetRepository.save(budget);
    }

    public Budget updateBudget(Long id, Budget updatedBudget) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!budget.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        budget.setCategory(updatedBudget.getCategory());
        budget.setMonthlyLimit(updatedBudget.getMonthlyLimit());
        budget.setCurrentSpending(updatedBudget.getCurrentSpending());

        return budgetRepository.save(budget);
    }

    public void deleteBudget(Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!budget.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        budgetRepository.delete(budget);
    }
}
