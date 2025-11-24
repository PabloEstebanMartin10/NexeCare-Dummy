package com.NexeCare.backend.service;

import com.NexeCare.backend.model.Medication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MedicationService {

    private List<Medication> meds = new ArrayList<>();

    public Medication getMed(int index){
        //checks if index is in the meds array and return null if not
        if (index> meds.size())return null;
        return meds.get(index);
    }
}
