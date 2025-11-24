package com.NexeCare.backend.service;

import com.NexeCare.backend.model.Treatment;
import com.NexeCare.backend.repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TreatmentService {

    private final TreatmentRepository repository;

    // GET uno
    public Treatment getTreatment(int id) {
        return repository.findById(id).orElse(null);
    }

    // GET todos
    public List<Treatment> getAllTreatments() {
        return repository.findAll();
    }

    // POST
    public Treatment createTreatment(Treatment treatment) {
        return repository.save(treatment);
    }

    // PUT
    public Treatment updateTreatment(int id, Treatment treatment) {
        return repository.findById(id).map(existing -> {

            existing.setChildId(treatment.getChildId());
            existing.setMedicationId(treatment.getMedicationId());
            existing.setStartDate(treatment.getStartDate());
            existing.setEndDate(treatment.getEndDate());
            existing.setSpecificDose(treatment.getSpecificDose());
            existing.setInstructions(treatment.getInstructions());

            return repository.save(existing);
        }).orElse(null);
    }

    // DELETE
    public boolean deleteTreatment(int id) {
        return repository.findById(id).map(treatment -> {
            repository.delete(treatment);
            return true;
        }).orElse(false);
    }
}
