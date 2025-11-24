package com.NexeCare.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class TakeRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "id_treatment")
    private int treatmentId;

    @Column(name = "id_registrator")
    private int registratorId;

    private Date date;

    @Column(name = "take_success")
    private Boolean takeSuccess;

    private String observations;
}
