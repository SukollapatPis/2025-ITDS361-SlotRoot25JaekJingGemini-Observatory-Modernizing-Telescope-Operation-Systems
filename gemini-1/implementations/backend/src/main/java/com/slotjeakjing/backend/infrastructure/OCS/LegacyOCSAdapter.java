package com.slotjeakjing.backend.infrastructure.OCS;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import edu.gemini.app.ocs.model.DataProcRequirement;
import edu.gemini.app.ocs.model.StarSystem;
import edu.gemini.app.ocs.model.SciencePlan;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;

@Component
public class LegacyOCSAdapter implements OCSClient {

    private final LegacyOCSService legacyOCSService = new LegacyOCSService(true);

    @Override
    public void submitPlan(SciencePlanDTO dto) {
        if (dto == null) return;

        SciencePlan legacyPlan = new SciencePlan();

        legacyPlan.setCreator(dto.getCreator());
        legacyPlan.setSubmitter(dto.getSubmitter());
        legacyPlan.setFundingInUSD(dto.getFunding());
        legacyPlan.setObjectives(dto.getObjective());

        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        if (dto.getStartDate() != null) legacyPlan.setStartDate(sdf.format(dto.getStartDate()));
        if (dto.getEndDate() != null) legacyPlan.setEndDate(sdf.format(dto.getEndDate()));

        if (dto.getTargetName() != null) {
            legacyPlan.setStarSystem(StarSystem.CONSTELLATIONS.valueOf(dto.getTargetName()));
        }
        if (dto.getTelescopeSite() != null) {
            legacyPlan.setTelescopeLocation(SciencePlan.TELESCOPELOC.valueOf(dto.getTelescopeSite()));
        }

        DataProcRequirement dpr = new DataProcRequirement();
        legacyPlan.setDataProcRequirements(dpr);

        System.out.println("[Adapter] Calling LegacyOCSService to create plan in OCS...");
        legacyOCSService.sendLegacyPlan(legacyPlan);
    }

    @Override
    public String testPlan(SciencePlanDTO dto) {
        if (dto == null) return "DTO is null";

        SciencePlan legacyPlan = new SciencePlan();
        legacyPlan.setFundingInUSD(dto.getFunding());
        legacyPlan.setObjectives(dto.getObjective());

        if (dto.getTargetName() != null) {
            legacyPlan.setStarSystem(StarSystem.CONSTELLATIONS.valueOf(dto.getTargetName()));
        }
        if (dto.getTelescopeSite() != null) {
            legacyPlan.setTelescopeLocation(SciencePlan.TELESCOPELOC.valueOf(dto.getTelescopeSite()));
        }

        return legacyOCSService.testLegacyPlan(legacyPlan);
    }
}