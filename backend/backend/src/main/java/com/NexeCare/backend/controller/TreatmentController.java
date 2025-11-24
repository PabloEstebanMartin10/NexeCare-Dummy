package com.NexeCare.backend.controller;

import com.NexeCare.backend.model.Treatment;
import com.NexeCare.backend.service.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("Treatments")
@RequiredArgsConstructor
public class TreatmentController {
    private final TreatmentService service;

    @GetMapping("/{index}")
    public ResponseEntity<Treatment> getTreatment(@PathVariable int index) {
        Treatment treatment = service.getTreatment(index);
        if (treatment == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(treatment);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Treatment>> getAllTreatments() {
        List<Treatment> treatments = service.getAllTreatments();
        return ResponseEntity.ok(treatments);
    }
}
