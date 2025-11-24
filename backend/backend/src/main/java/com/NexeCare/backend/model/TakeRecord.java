package com.NexeCare.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TakeRecord {

    public TakeRecord(int id_treatment, int id_registrator, Date date, Boolean take_success, String observations) {
        this.id_treatment = id_treatment;
        this.id_registrator = id_registrator;
        this.date = date;
        this.take_success = take_success;
        this.observations = observations;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_treatment;
    private int id_registrator;
    private Date date;
    private Boolean take_success;
    private String observations;
}
