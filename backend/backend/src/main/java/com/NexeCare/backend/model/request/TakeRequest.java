package com.NexeCare.backend.model.request;

import lombok.Data;

@Data
public class TakeRequest {
    private int treatment_id;
    private int registeredBy_id;
    private Boolean takeSuccess;
    private String observations;
}
