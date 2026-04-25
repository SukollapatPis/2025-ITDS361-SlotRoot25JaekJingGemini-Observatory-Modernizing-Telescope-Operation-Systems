package com.slotjeakjing.backend.infrastructure.OCS;

import edu.gemini.app.ocs.OCS;
import edu.gemini.app.ocs.model.SciencePlan;

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
                throw new RuntimeException("Input data is not compatible with the legacy OCS system.");
            } else {
                System.out.println("[LegacyOCSService] Success: Plan is now in OCS.");
            }
            int planNo = legacyPlan.getPlanNo();
            ocsDatabase.put(planNo, legacyPlan);
            System.out.println("[LegacyOCSService] Created in OCS with planNo = " + planNo);
            return planNo;
        }
        throw new RuntimeException("Invalid plan object");
    }

    public SciencePlan getPlan(int planNo) {
        SciencePlan sp = ocsDatabase.get(planNo);

        if (sp == null) {
            throw new RuntimeException("Plan not found in OCS: " + planNo);
        }

        return sp;
    }

    public String testLegacyPlan(int planNo) {

        SciencePlan sp = getPlan(planNo);

        System.out.println("========= OCS DEBUG =========");
        System.out.println("PlanNo: " + sp.getPlanNo());
        System.out.println("Status: " + sp.getStatus());
        System.out.println("DPR: " + sp.getDataProcRequirements());
        System.out.println("=============================");

        return realOCS.testSciencePlan(sp);
    }

    public List<SciencePlan> getAllPlans() {
        return new ArrayList<>(ocsDatabase.values());
    }

}