package com.slotjeakjing.backend.infrastructure.OCS;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import edu.gemini.app.ocs.model.SciencePlan;

public interface OCSClient {
    void submitPlan(SciencePlanDTO dto);
    String testPlan(SciencePlanDTO dto);
}
