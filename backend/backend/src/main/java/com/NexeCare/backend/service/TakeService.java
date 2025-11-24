package com.NexeCare.backend.service;

import com.NexeCare.backend.model.TakeRecord;
import com.NexeCare.backend.repository.TakeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TakeService {

    private final TakeRepository repository;

    public List<TakeRecord> getTake(int treatmentId){
        return repository.findByTreatmentId(treatmentId);
    }

    public TakeRecord registerTake(TakeRecord take){
        return repository.save(take);
    }

    public boolean deleteTake(int id){
        return repository.findById(id).map(t -> {
            repository.delete(t);
            return true;
        }).orElse(false);
    }
}
