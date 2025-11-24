package com.NexeCare.backend.controller;

import com.NexeCare.backend.model.Medication;
import com.NexeCare.backend.service.MedicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/medication")
@RequiredArgsConstructor
public class MedicationController {
    private MedicationService service;


    @GetMapping("{index}")
    public ResponseEntity<Medication> getMed(@RequestParam int index){
        Medication med = service.getMed(index);
        if (med == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(med);
    }

}
