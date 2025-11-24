package com.NexeCare.backend.controller;

import com.NexeCare.backend.model.TakeRecord;
import com.NexeCare.backend.model.request.TakeRequest;
import com.NexeCare.backend.service.TakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/take")
@RequiredArgsConstructor
public class TakeController {

    private final TakeService service;

    @GetMapping("/{treatmentId}")
    public ResponseEntity<List<TakeRecord>> getTake(@PathVariable int treatmentId){
        return ResponseEntity.ok(service.getTake(treatmentId));
    }

    @PostMapping
    public ResponseEntity<TakeRecord> createTake(@RequestBody TakeRequest request){

        TakeRecord take = new TakeRecord(
                0,
                request.getTreatment_id(),
                request.getRegisteredBy_id(),
                new Date(),
                request.getTakeSuccess(),
                request.getObservations()
        );

        TakeRecord saved = service.registerTake(take);

        return ResponseEntity
                .created(URI.create("/take/" + saved.getId()))
                .body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTake(@PathVariable int id){
        if (service.deleteTake(id)) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }
}

