package com.slotjeakjing.backend.infrastructure.OCS;

import edu.gemini.app.ocs.OCS;
import edu.gemini.app.ocs.model.SciencePlan;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LegacyOCSService {
    private Map<Integer, SciencePlan> ocsDatabase = new HashMap<>();
    private final OCS realOCS;

    public LegacyOCSService(boolean debugMode) {
        this.realOCS = new OCS(debugMode);
    }

    public int sendLegacyPlan(Object plan) {
        if (plan instanceof SciencePlan legacyPlan) {

            String result = realOCS.createSciencePlan(legacyPlan);
            if (result.contains("-1")) {
                System.out.println("[LegacyOCSService] FAILED: OCS rejected the plan.");
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Input data is not compatible with the legacy OCS system.");
            } else {
                System.out.println("[LegacyOCSService] Success: Plan is now in OCS.");
            }
            int planNo = legacyPlan.getPlanNo();
            ocsDatabase.put(planNo, legacyPlan);
            System.out.println("[LegacyOCSService] Created in OCS with planNo = " + planNo);
            return planNo;
        }
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Invalid plan object");
    }

    public SciencePlan getPlan(int planNo) {
        SciencePlan sp = ocsDatabase.get(planNo);

        if (sp == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Plan not found in OCS: " + planNo);
        }

        return sp;
    }

    public String testLegacyPlan(int planNo) {
        SciencePlan sp = getPlan(planNo);
        return realOCS.testSciencePlan(sp);
    }

    public List<SciencePlan> getAllPlans() {

        List<SciencePlan> plans = realOCS.getAllSciencePlans();

        if (plans == null || plans.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "There are currently no science plans in OCS."
            );
        }

        return plans;
    }

    public void changeStatus(int planNo, String status) {

        SciencePlan plan = getPlan(planNo);

        plan.setStatus(SciencePlan.STATUS.valueOf(status));

        realOCS.updateSciencePlanStatus(
                planNo,
                SciencePlan.STATUS.valueOf(status)
        );

        System.out.println("[LegacyOCSService] OCS Plan " + planNo +
                " changed status to " + status);
    }
}