package com.slotjeakjing.backend.infrastructure.OCS;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import edu.gemini.app.ocs.model.SciencePlan;

import java.util.List;

public interface OCSClient {
    int createPlan(SciencePlanDTO dto);
    String testPlan(int ocsPlanNo);
    void changeStatus(int ocsPlanNo, String status);
    List<SciencePlan> getAllSciencePlans();
}
