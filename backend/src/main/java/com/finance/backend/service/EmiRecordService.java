package com.finance.backend.service;

import com.finance.backend.entity.EmiRecord;
import com.finance.backend.entity.User;
import com.finance.backend.repository.EmiRecordRepository;
import com.finance.backend.repository.UserRepository;
import com.finance.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmiRecordService {

    private final EmiRecordRepository emiRecordRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<EmiRecord> getAllEmiRecords() {
        return emiRecordRepository.findByUserId(getCurrentUser().getId());
    }

    public EmiRecord addEmiRecord(EmiRecord record) {
        record.setUser(getCurrentUser());
        return emiRecordRepository.save(record);
    }

    public void deleteEmiRecord(Long id) {
        EmiRecord record = emiRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        if (!record.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized");
        }

        emiRecordRepository.delete(record);
    }
}
