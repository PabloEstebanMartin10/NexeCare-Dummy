package com.NexeCare.backend.controller;

import com.NexeCare.backend.model.Treatment;
import com.NexeCare.backend.service.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/treatments")
@RequiredArgsConstructor
public class TreatmentController {

    private final TreatmentService service;

    // GET uno
    @GetMapping("/{id}")
    public ResponseEntity<Treatment> getTreatment(@PathVariable int id) {
        Treatment treatment = service.getTreatment(id);
        if (treatment == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(treatment);
    }

    // GET todos
    @GetMapping
    public ResponseEntity<List<Treatment>> getAll() {
        return ResponseEntity.ok(service.getAllTreatments());
    }

    // POST
    @PostMapping
    public ResponseEntity<Treatment> create(@RequestBody Treatment treatment) {
        return ResponseEntity.ok(service.createTreatment(treatment));
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Treatment> update(
            @PathVariable int id,
            @RequestBody Treatment treatment
    ) {
        Treatment updated = service.updateTreatment(id, treatment);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        boolean deleted = service.deleteTreatment(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().build();
    }
}
