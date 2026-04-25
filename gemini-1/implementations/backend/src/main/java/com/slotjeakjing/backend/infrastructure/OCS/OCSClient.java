package com.slotjeakjing.backend.infrastructure.OCS;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;

public interface OCSClient {
    int submitPlan(SciencePlanDTO dto);
    String testPlan(int ocsPlanNo);
}
