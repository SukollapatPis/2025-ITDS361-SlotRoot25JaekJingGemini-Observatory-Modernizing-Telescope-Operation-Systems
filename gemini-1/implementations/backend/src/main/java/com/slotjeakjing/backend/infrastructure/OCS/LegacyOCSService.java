package com.slotjeakjing.backend.infrastructure.OCS;

import edu.gemini.app.ocs.OCS;
import edu.gemini.app.ocs.model.SciencePlan;

import java.util.ArrayList;
import java.util.List;

public class LegacyOCSService {
    private List<SciencePlan> ocsDatabase = new ArrayList<>();
    private final OCS realOCS;

    public LegacyOCSService(boolean debugMode) {
        this.realOCS = new OCS(debugMode);
    }

    public void sendLegacyPlan(Object plan) {
        if (plan instanceof SciencePlan) {
            SciencePlan legacyPlan = (SciencePlan) plan;

            ocsDatabase.add(legacyPlan);

            realOCS.createSciencePlan(legacyPlan);
            realOCS.submitSciencePlan(legacyPlan);

            String result = realOCS.createSciencePlan(legacyPlan);

            if (result.contains("-1")) {
                System.out.println("[LegacyOCSService] FAILED: OCS rejected the plan.");
                throw new RuntimeException("OCS Submission Failed: " + result);
            } else {
                System.out.println("[LegacyOCSService] Success: Plan is now in OCS.");
            }
        }
    }

    public String testLegacyPlan(SciencePlan sp) {
        System.out.println("[LegacyOCSService] Testing Science Plan...");
        return realOCS.testSciencePlan(sp);
    }

    public List<SciencePlan> getAllPlans() {
        return ocsDatabase;
    }

}