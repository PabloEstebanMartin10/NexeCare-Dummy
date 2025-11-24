package com.NexeCare.backend.service;

import com.NexeCare.backend.model.Treatment;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class TreatmentService {
    private List<Treatment> treatments;

    public Treatment getTreatment(int index) {
        //check if index is in treatments and return null if not
        if (index > treatments.size()) return null;
        return treatments.get(index);
    }

    public List<Treatment> getAllTreatments() {
        //returns all the treatments
        return treatments;
    }
}
