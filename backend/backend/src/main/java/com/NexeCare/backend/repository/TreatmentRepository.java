package com.NexeCare.backend.repository;

import com.NexeCare.backend.model.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentRepository extends JpaRepository<Treatment, Integer> {}

