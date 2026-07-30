package com.finance.backend.controller;

import com.finance.backend.entity.Investment;
import com.finance.backend.service.InvestmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investments")
@RequiredArgsConstructor
public class InvestmentController {

    private final InvestmentService investmentService;

    @GetMapping
    public ResponseEntity<List<Investment>> getAllInvestments() {
        return ResponseEntity.ok(investmentService.getAllInvestments());
    }

    @PostMapping
    public ResponseEntity<Investment> addInvestment(@Valid @RequestBody Investment investment) {
        return ResponseEntity.ok(investmentService.addInvestment(investment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Investment> updateInvestment(@PathVariable Long id, @Valid @RequestBody Investment investment) {
        return ResponseEntity.ok(investmentService.updateInvestment(id, investment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvestment(@PathVariable Long id) {
        investmentService.deleteInvestment(id);
        return ResponseEntity.ok().build();
    }
}
