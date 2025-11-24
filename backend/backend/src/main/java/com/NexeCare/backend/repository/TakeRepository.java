package com.NexeCare.backend.repository;

import com.NexeCare.backend.model.TakeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TakeRepository extends JpaRepository<TakeRecord, Integer> {

    @Query("SELECT t FROM TakeRecord t WHERE t.treatmentId = :treatmentId")
    List<TakeRecord> findByTreatmentId(@Param("treatmentId") int treatmentId);
}

