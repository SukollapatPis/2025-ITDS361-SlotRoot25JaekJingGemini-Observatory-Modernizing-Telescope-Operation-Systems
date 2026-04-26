package com.slotjeakjing.backend.Application;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Domain.Model.SciencePlan;
import com.slotjeakjing.backend.Enum.PlanStatus;

import java.util.List;

public interface SciencePlanService {
    SciencePlan createPlan(SciencePlanDTO dto);
    void updatePlan(int planId, SciencePlanDTO dto);
    void submitPlan(int planId);
    String testPlan(int planId);
    void approvePlan(int planId);
    void invalidatePlan(int planId, String feedback);
    List<SciencePlan> getSubmittedPlans();
    SciencePlan getPlanById(int planId);
    List<SciencePlan> getPlansByCreator(int userId);
    List<SciencePlan> getPlansByStatus(PlanStatus state);
    List<SciencePlan> getAllPlans();
}