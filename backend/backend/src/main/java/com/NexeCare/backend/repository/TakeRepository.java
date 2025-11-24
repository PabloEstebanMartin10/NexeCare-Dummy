package com.NexeCare.backend.repository;

import com.NexeCare.backend.model.TakeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TakeRepository extends JpaRepository<TakeRecord, Integer> {
    @Query("Select u from Take inner join Treatment on Take.idTreatment = Treatment.id where childId = :childId")
    List<TakeRecord> findBychildId(@Param("childId") int childId);
}
