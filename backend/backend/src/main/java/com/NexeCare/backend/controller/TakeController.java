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


    @GetMapping("/{index}")
    public ResponseEntity<TakeRecord> getTake(@PathVariable int index) {
        TakeRecord take = service.getTake(index);
        if (take == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(take);
    }

    @PostMapping
    public ResponseEntity<TakeRecord> createTake(@RequestBody TakeRequest request) {
        TakeRecord take = new TakeRecord(request.getTreatment_id(), request.getRegisteredBy_id(), new Date(), request.getTakeSuccess(), request.getObservations());
        int index = service.registerTake(take);
        URI location = URI.create("takes/" + index);
        return ResponseEntity.created(location).body(take);
    }
}
