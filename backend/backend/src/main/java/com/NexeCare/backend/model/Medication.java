package com.NexeCare.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name_medication")
    private String nameMedication;

    @Column(name = "dose_unit")
    private String doseUnit;

    private String type;

    private String frequency;

    @Column(name = "min_stock")
    private int minStock;

    private int stock;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;
}
