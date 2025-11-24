package com.NexeCare.backend.controller;

import com.NexeCare.backend.model.Medication;
import com.NexeCare.backend.service.MedicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medication")
@RequiredArgsConstructor
public class MedicationController {

    private final MedicationService service;

    // Obtener un medicamento
    @GetMapping("/{id}")
    public ResponseEntity<Medication> getMed(@PathVariable int id) {
        Medication med = service.getMed(id);
        if (med == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(med);
    }

    // Obtener todos los medicamentos
    @GetMapping
    public ResponseEntity<List<Medication>> getAllMeds() {
        List<Medication> meds = service.getAllMeds();
        if (meds.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(meds);
    }

    // Crear un nuevo medicamento
    @PostMapping
    public ResponseEntity<Medication> createMed(@RequestBody Medication medication) {
        Medication created = service.createMed(medication);
        return ResponseEntity.ok(created);
    }

    // Actualizar un medicamento
    @PutMapping("/{id}")
    public ResponseEntity<Medication> updateMed(@PathVariable int id, @RequestBody Medication medication) {
        Medication updated = service.updateMed(id, medication);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    // Eliminar un medicamento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMed(@PathVariable int id) {
        boolean deleted = service.deleteMed(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().build();
    }
}
