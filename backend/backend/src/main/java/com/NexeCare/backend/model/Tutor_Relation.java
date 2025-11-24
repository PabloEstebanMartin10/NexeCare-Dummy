package com.NexeCare.backend.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tutor_Relation {
    @EmbeddedId
    private Tutor_Relation_Id id;
    private String relation_type;
    private Boolean emergency_contact;
}
