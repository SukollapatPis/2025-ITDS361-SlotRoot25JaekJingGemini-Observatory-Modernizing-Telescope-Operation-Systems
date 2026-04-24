package com.slotjeakjing.backend.Repository;

import com.slotjeakjing.backend.Enum.PlanStatus;
import com.slotjeakjing.backend.Domain.Model.SciencePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SciencePlanRepository extends JpaRepository<SciencePlan, Integer> {
    List<SciencePlan> findByState(PlanStatus state);

    List<SciencePlan> findByCreatorName(String name);
}