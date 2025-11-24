package com.NexeCare.backend.service;

import com.NexeCare.backend.model.TakeRecord;
import com.NexeCare.backend.repository.TakeRepository;

import java.util.List;

public class TakeService {
    private List<TakeRecord> takes;
    private final TakeRepository repository;

    public TakeService(TakeRepository repository) {
        this.repository = repository;
    }

    public List<TakeRecord> getTake(int id){
       return repository.findBychildId(id);
    }
    public int registerTake(TakeRecord take){
        TakeRecord record  = repository.save(take);
        return record.getId();
    }

    public Boolean deleteTake(int id){
        return repository.findById(id).map(take -> {
            repository.delete(take);
            return true;
        }).orElse(false);
    }
}
