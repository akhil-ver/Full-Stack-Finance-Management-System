package com.finance.backend.service;

import com.finance.backend.entity.Investment;
import com.finance.backend.entity.Transaction;
import com.finance.backend.entity.User;
import com.finance.backend.repository.InvestmentRepository;
import com.finance.backend.repository.TransactionRepository;
import com.finance.backend.repository.UserRepository;
import com.finance.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final TransactionRepository transactionRepository;
    private final InvestmentRepository investmentRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Map<String, Object> getMonthlyAnalytics() {
        Long userId = getCurrentUser().getId();
        LocalDate now = LocalDate.now();
        LocalDate startOfMonth = now.withDayOfMonth(1);
        LocalDate endOfMonth = now.withDayOfMonth(now.lengthOfMonth());

        List<Transaction> monthlyTransactions = transactionRepository.findByUserIdAndTransactionDateBetween(
                userId, startOfMonth, endOfMonth);

        BigDecimal totalIncome = monthlyTransactions.stream()
                .filter(t -> "income".equalsIgnoreCase(t.getType()))
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = monthlyTransactions.stream()
                .filter(t -> "expense".equalsIgnoreCase(t.getType()))
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalIncome", totalIncome);
        analytics.put("totalExpense", totalExpense);
        analytics.put("savings", totalIncome.subtract(totalExpense));
        return analytics;
    }

    public Map<String, BigDecimal> getExpenseAnalytics() {
        Long userId = getCurrentUser().getId();
        List<Transaction> expenses = transactionRepository.findByUserIdAndType(userId, "expense");

        return expenses.stream()
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));
    }

    public Map<String, Object> getInvestmentAnalytics() {
        Long userId = getCurrentUser().getId();
        List<Investment> investments = investmentRepository.findByUserId(userId);

        BigDecimal totalInvested = investments.stream()
                .map(Investment::getInvestedAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalCurrentValue = investments.stream()
                .map(Investment::getCurrentValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalInvested", totalInvested);
        analytics.put("totalCurrentValue", totalCurrentValue);
        analytics.put("totalProfitLoss", totalCurrentValue.subtract(totalInvested));
        
        return analytics;
    }
}
