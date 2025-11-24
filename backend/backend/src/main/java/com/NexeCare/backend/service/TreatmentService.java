package com.NexeCare.backend.service;

import com.NexeCare.backend.model.Treatment;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class TreatmentService {
    private List<Treatment> treatments;

    public Treatment getTreatment(int index) {
        if (index > treatments.size()) return null;
        return treatments.get(index);
    }

    public List<Treatment> getAllTreatments() {
        return treatments;
    }
}
