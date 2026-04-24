package com.slotjeakjing.backend.Application;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Domain.Model.SciencePlan;
import com.slotjeakjing.backend.Domain.Model.User;
import com.slotjeakjing.backend.Enum.PlanStatus;
import com.slotjeakjing.backend.Factory.SciencePlanFactory;
import com.slotjeakjing.backend.infrastructure.OCS.OCSClient;
import com.slotjeakjing.backend.infrastructure.logging.AuditLogger;
import com.slotjeakjing.backend.infrastructure.security.AccessControlService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Primary
public class SciencePlanServiceProxy implements SciencePlanService {

    @Autowired
    @Qualifier("sciencePlanServiceImpl")
    private SciencePlanService actualService;

    @Autowired
    private AccessControlService accessControl;

    @Autowired
    private OCSClient ocsClient;

    @Autowired
    private HttpSession session;

    @Autowired
    private AuditLogger logger;

    private User getCurrentUser() {
        return (User) session.getAttribute("currentUser");
    }

    @Override
    public SciencePlan createPlan(SciencePlanDTO dto) {
        User user = getCurrentUser();
        if (accessControl.canCreate(user)) {
            logger.log("CREATE", "INFO", "Attempting to create plan: " + dto.getPlanName(), "SYSTEM", 0);
            SciencePlan plan = actualService.createPlan(dto);
            logger.log("CREATE", "INFO", "Plan created successfully", "SYSTEM", plan.getPlanId());
            return plan;
        } else {
            logger.log("CREATE", "WARNING", "Unauthorized creation attempt", "SYSTEM", 0);
            throw new RuntimeException("Only Astronomers can create plans");
        }
    }

    @Override
    public void submitPlan(int planId) {
        User user = getCurrentUser();
        SciencePlan plan = actualService.getPlanById(planId);

        if (!accessControl.canSubmit(user, plan)) {
            logger.log("SUBMIT", "WARNING", "Permission denied", (user != null ? user.getName() : "Unknown"), planId);
            throw new RuntimeException("คุณไม่มีสิทธิ์ส่งแผนงานนี้ หรือแผนยังไม่ได้ผ่านการทดสอบ");
        }

        try {
            actualService.submitPlan(planId);

            SciencePlan updatedPlan = actualService.getPlanById(planId);
            SciencePlanDTO dto = SciencePlanFactory.convertToDTO(updatedPlan);

            ocsClient.submitPlan(dto);

            logger.log("SUBMIT", "INFO", "Plan submitted successfully to OCS by " + user.getName(), user.getName(), planId);
        } catch (Exception e) {
            logger.log("SUBMIT", "ERROR", "Submission failed: " + e.getMessage(), (user != null ? user.getName() : "SYSTEM"), planId);
            throw e;
        }
    }

    @Override
    public void approvePlan(int planId) {
        User user = getCurrentUser();
        SciencePlan plan = actualService.getPlanById(planId);

        if (accessControl.canValidate(user, plan)) {
            actualService.approvePlan(planId);
            logger.log("APPROVE", "INFO", "Plan approved", "SYSTEM", planId);
        } else {
            throw new RuntimeException("Only Science Observers can approve plans");
        }
    }

    @Override
    public void updatePlan(int planId, SciencePlanDTO dto) {
        User user = getCurrentUser();
        SciencePlan plan = actualService.getPlanById(planId);

        if (accessControl.canUpdate(user, plan)) {
            actualService.updatePlan(planId, dto);
            logger.log("UPDATE", "INFO", "Plan updated", "SYSTEM", planId);
        } else {
            throw new RuntimeException("Unauthorized update attempt");
        }
    }

    @Override
    public String testPlan(int planId) {
        User user = getCurrentUser();
        SciencePlan plan = actualService.getPlanById(planId);

        logger.log("TEST", "INFO", "Testing plan with OCS Legacy System", user.getName(), planId);
        if (accessControl.canTest(user, plan)) {
            try {
                String result = actualService.testPlan(planId);

                if (result.equalsIgnoreCase("Pass")) {
                    logger.log("TEST", "INFO", "OCS Test Passed", "SYSTEM", planId);
                } else {
                    logger.log("TEST", "WARNING", "OCS Test Failed: " + result, "SYSTEM", planId);
                }
                return result;
            } catch (Exception e) {
                logger.log("TEST", "ERROR", "Test connection failed", "SYSTEM", planId);
                return "Error: " + e.getMessage();
            }
        } else {
            throw new RuntimeException("Unauthorized test attempt");
        }
    }

    @Override public void invalidatePlan(int planId, String feedback) { actualService.invalidatePlan(planId, feedback); }
    @Override public List<SciencePlan> getSubmittedPlans() { return actualService.getSubmittedPlans(); }
    @Override public SciencePlan getPlanById(int planId) { return actualService.getPlanById(planId); }
    @Override
    public List<SciencePlan> getPlansByCreator(String userId) {
        return actualService.getPlansByCreator(userId);
    }
    @Override public List<SciencePlan> getPlansByStatus(PlanStatus state) {
        return actualService.getPlansByStatus(state);
    }
}