package com.finance.backend.controller;

import com.finance.backend.entity.EmiRecord;
import com.finance.backend.service.EmiRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emis")
@RequiredArgsConstructor
public class EmiRecordController {

    private final EmiRecordService emiRecordService;

    @GetMapping
    public ResponseEntity<List<EmiRecord>> getAllEmiRecords() {
        return ResponseEntity.ok(emiRecordService.getAllEmiRecords());
    }

    @PostMapping
    public ResponseEntity<EmiRecord> addEmiRecord(@Valid @RequestBody EmiRecord record) {
        return ResponseEntity.ok(emiRecordService.addEmiRecord(record));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmiRecord(@PathVariable Long id) {
        emiRecordService.deleteEmiRecord(id);
        return ResponseEntity.ok().build();
    }
}
