package com.finance.backend.service;

import com.finance.backend.entity.Transaction;
import com.finance.backend.entity.User;
import com.finance.backend.repository.TransactionRepository;
import com.finance.backend.repository.UserRepository;
import com.finance.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findByUserIdOrderByTransactionDateDesc(getCurrentUser().getId());
    }

    public Transaction addTransaction(Transaction transaction) {
        transaction.setUser(getCurrentUser());
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Long id, Transaction updatedTransaction) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        if (!transaction.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        transaction.setType(updatedTransaction.getType());
        transaction.setCategory(updatedTransaction.getCategory());
        transaction.setAmount(updatedTransaction.getAmount());
        transaction.setDescription(updatedTransaction.getDescription());
        transaction.setTransactionDate(updatedTransaction.getTransactionDate());

        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        transactionRepository.delete(transaction);
    }
}
