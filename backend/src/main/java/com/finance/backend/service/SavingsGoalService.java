package com.finance.backend.service;

import com.finance.backend.entity.SavingsGoal;
import com.finance.backend.entity.User;
import com.finance.backend.repository.SavingsGoalRepository;
import com.finance.backend.repository.UserRepository;
import com.finance.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingsGoalService {

    private final SavingsGoalRepository savingsGoalRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<SavingsGoal> getAllGoals() {
        return savingsGoalRepository.findByUserId(getCurrentUser().getId());
    }

    public SavingsGoal addGoal(SavingsGoal goal) {
        goal.setUser(getCurrentUser());
        return savingsGoalRepository.save(goal);
    }

    public SavingsGoal updateGoal(Long id, SavingsGoal updatedGoal) {
        SavingsGoal goal = savingsGoalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        goal.setGoalName(updatedGoal.getGoalName());
        goal.setTargetAmount(updatedGoal.getTargetAmount());
        goal.setSavedAmount(updatedGoal.getSavedAmount());
        goal.setDeadline(updatedGoal.getDeadline());

        return savingsGoalRepository.save(goal);
    }

    public void deleteGoal(Long id) {
        SavingsGoal goal = savingsGoalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        savingsGoalRepository.delete(goal);
    }
}
