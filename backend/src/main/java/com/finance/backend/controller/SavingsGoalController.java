package com.finance.backend.controller;

import com.finance.backend.entity.SavingsGoal;
import com.finance.backend.service.SavingsGoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class SavingsGoalController {

    private final SavingsGoalService savingsGoalService;

    @GetMapping
    public ResponseEntity<List<SavingsGoal>> getAllGoals() {
        return ResponseEntity.ok(savingsGoalService.getAllGoals());
    }

    @PostMapping
    public ResponseEntity<SavingsGoal> addGoal(@Valid @RequestBody SavingsGoal goal) {
        return ResponseEntity.ok(savingsGoalService.addGoal(goal));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SavingsGoal> updateGoal(@PathVariable Long id, @Valid @RequestBody SavingsGoal goal) {
        return ResponseEntity.ok(savingsGoalService.updateGoal(id, goal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        savingsGoalService.deleteGoal(id);
        return ResponseEntity.ok().build();
    }
}
