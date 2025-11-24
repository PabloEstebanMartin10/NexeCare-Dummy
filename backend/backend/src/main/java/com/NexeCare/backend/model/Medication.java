package com.NexeCare.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name_medication", nullable = false)
    private String nameMedication;

    @Column(name = "dose_unit", nullable = false)
    private String doseUnit;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "frequency", nullable = false)
    private String frequency;

    @Column(name = "min_stock", nullable = false)
    private int minStock;

    @Column(name = "stock", nullable = false)
    private int stock;
}