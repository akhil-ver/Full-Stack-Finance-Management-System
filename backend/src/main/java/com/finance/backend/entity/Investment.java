package com.finance.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "investments")
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank(message = "Investment type is required")
    private String investmentType;

    @NotBlank(message = "Investment name is required")
    private String investmentName;

    @NotNull(message = "Invested amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal investedAmount;

    @NotNull(message = "Current value is required")
    @DecimalMin(value = "0.00", message = "Value cannot be negative")
    private BigDecimal currentValue;

    @Builder.Default
    private BigDecimal profitLoss = BigDecimal.ZERO;
}
