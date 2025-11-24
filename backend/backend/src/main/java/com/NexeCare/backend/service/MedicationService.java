package com.NexeCare.backend.service;

import com.NexeCare.backend.model.Medication;
import com.NexeCare.backend.repository.MedicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicationService {

    private final MedicationRepository repository;

    // Constructor para inyección de dependencia
    public MedicationService(MedicationRepository repository) {
        this.repository = repository;
    }

    /**
     * Obtiene un medicamento por su ID
     * @param id ID del medicamento
     * @return Medicamento encontrado o null si no existe
     */
    public Medication getMed(int id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Devuelve todos los medicamentos
     * @return Lista de medicamentos
     */
    public List<Medication> getAllMeds() {
        return repository.findAll();
    }

    /**
     * Crea un nuevo medicamento
     * @param medication Objeto Medication
     * @return Medicamento guardado
     */
    public Medication createMed(Medication medication) {
        return repository.save(medication);
    }

    /**
     * Actualiza un medicamento existente
     * @param id ID del medicamento a actualizar
     * @param medication Datos actualizados
     * @return Medicamento actualizado o null si no existe
     */
    public Medication updateMed(int id, Medication medication) {
        return repository.findById(id).map(existingMed -> {
            existingMed.setName_medication(medication.getName_medication());
            existingMed.setDose_unit(medication.getDose_unit());
            existingMed.setType(medication.getType());
            existingMed.setFrecuency(medication.getFrecuency());
            existingMed.setMin_stock(medication.getMin_stock());
            existingMed.setStock(medication.getStock());
            return repository.save(existingMed);
        }).orElse(null);
    }

    /**
     * Elimina un medicamento por su ID
     * @param id ID del medicamento
     * @return true si se eliminó, false si no existía
     */
    public boolean deleteMed(int id) {
        return repository.findById(id).map(med -> {
            repository.delete(med);
            return true;
        }).orElse(false);
    }
}
