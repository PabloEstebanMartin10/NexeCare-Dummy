package com.NexeCare.backend.service;

import com.NexeCare.backend.model.TakeRecord;

import java.util.List;

public class TakeService {
    private List<TakeRecord> takes;

    public TakeRecord getTake(int index){
        //check if index is in takes and return null if not
        if (index>takes.size())return null;
        return takes.get(index);
    }
    public int registerTake(TakeRecord take){
        //TODO
        return takes.size()-1;
    }
}
