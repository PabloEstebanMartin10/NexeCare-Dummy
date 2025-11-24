package com.NexeCare.backend.controller;

import com.NexeCare.backend.model.Medication;
import com.NexeCare.backend.service.MedicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medication")
@RequiredArgsConstructor
public class MedicationController {
    private final MedicationService service;


    @GetMapping("{index}")
    public ResponseEntity<Medication> getMed(@PathVariable int index) {
        Medication med = service.getMed(index);
        if (med == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(med);
    }

}
