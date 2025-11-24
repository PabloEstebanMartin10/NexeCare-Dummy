package com.NexeCare.backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class Tutor_Relation_Id implements Serializable {
    private int child_id;
    private int tutor_id;
}
