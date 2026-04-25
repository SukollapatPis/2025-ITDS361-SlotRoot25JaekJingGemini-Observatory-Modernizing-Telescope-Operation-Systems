package com.slotjeakjing.backend.infrastructure.OCS;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Enum.PlanStatus;
import edu.gemini.app.ocs.model.DataProcRequirement;
import edu.gemini.app.ocs.model.StarSystem;
import edu.gemini.app.ocs.model.SciencePlan;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.List;

@Component
public class LegacyOCSAdapter implements OCSClient {

    private final LegacyOCSService legacyOCSService = new LegacyOCSService(true);

    @Override
    public int createPlan(SciencePlanDTO dto) {
        if (dto == null) throw new RuntimeException("DTO is null");
        SciencePlan legacyPlan = new SciencePlan();

        legacyPlan.setCreator(dto.getCreator());
        legacyPlan.setSubmitter(dto.getSubmitter());
        legacyPlan.setFundingInUSD(dto.getFunding());
        legacyPlan.setObjectives(dto.getObjective());

        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

        if (dto.getStartDate() != null)
            legacyPlan.setStartDate(sdf.format(dto.getStartDate()));

        if (dto.getEndDate() != null)
            legacyPlan.setEndDate(sdf.format(dto.getEndDate()));

        if (dto.getTargetName() != null)
            legacyPlan.setStarSystem(
                    StarSystem.CONSTELLATIONS.valueOf(dto.getTargetName())
            );

        if (dto.getTelescopeSite() != null)
            legacyPlan.setTelescopeLocation(
                    SciencePlan.TELESCOPELOC.valueOf(dto.getTelescopeSite())
            );

        DataProcRequirement dpr = new DataProcRequirement();
        dpr.setFileType(mapFileType(dto.getFileType()));
        dpr.setFileQuality(mapFileQuality(dto.getFileQuality()));
        dpr.setColorType(mapColorType(dto.getColorType()));
        dpr.setExposure(dto.getExposure());
        dpr.setContrast(dto.getContrast());
        dpr.setBrightness(dto.getBrightness());
        dpr.setSaturation(dto.getSaturation());

        legacyPlan.setDataProcRequirements(dpr);

        System.out.println("[Adapter] Calling LegacyOCSService to create plan in OCS...");

        return legacyOCSService.sendLegacyPlan(legacyPlan);
    }

    @Override
    public String testPlan(int ocsPlanNo) {

        System.out.println("[Adapter] Testing REAL OCS planNo = " + ocsPlanNo);

        return legacyOCSService.testLegacyPlan(ocsPlanNo);
    }

    @Override
    public void changeStatus(int ocsPlanNo, String status) {
        legacyOCSService.changeStatus(ocsPlanNo, status);
    }

    @Override
    public List<SciencePlan> getAllSciencePlans() {
        return legacyOCSService.getAllPlans();
    }

    private String mapFileType(String value) {

        if (value == null) return null;

        switch (value.toUpperCase()) {
            case "PNG":
                return "PNG";
            case "JPEG":
                return "JPEG";
            case "RAW":
                return "RAW";
            default:
                return null;
        }
    }

    private String mapFileQuality(String value) {

        if (value == null) return null;

        switch (value.toUpperCase()) {
            case "LOW":
                return "Low";
            case "FINE":
                return "Fine";
            default:
                return null;
        }
    }

    private String mapColorType(String value) {

        if (value == null) return null;

        switch (value.toUpperCase()) {
            case "COLOR":
                return "Color mode";
            case "BW":
                return "B&W mode";
            default:
                return null;
        }
    }
}