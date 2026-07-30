package com.finance.backend.repository;

import com.finance.backend.entity.EmiRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmiRecordRepository extends JpaRepository<EmiRecord, Long> {
    List<EmiRecord> findByUserId(Long userId);
}
