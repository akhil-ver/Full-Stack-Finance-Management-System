package com.finance.backend.controller;

import com.finance.backend.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyAnalytics() {
        return ResponseEntity.ok(analyticsService.getMonthlyAnalytics());
    }

    @GetMapping("/expenses")
    public ResponseEntity<Map<String, BigDecimal>> getExpenseAnalytics() {
        return ResponseEntity.ok(analyticsService.getExpenseAnalytics());
    }

    @GetMapping("/investments")
    public ResponseEntity<Map<String, Object>> getInvestmentAnalytics() {
        return ResponseEntity.ok(analyticsService.getInvestmentAnalytics());
    }
}
