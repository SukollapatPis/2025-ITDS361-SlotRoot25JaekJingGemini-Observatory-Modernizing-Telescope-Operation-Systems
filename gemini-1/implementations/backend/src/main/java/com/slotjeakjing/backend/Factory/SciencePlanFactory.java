package com.slotjeakjing.backend.Factory;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Enum.*;
import com.slotjeakjing.backend.Domain.Model.*;

import java.time.LocalDateTime;

public class SciencePlanFactory {

    public static SciencePlan createPlan(SciencePlanDTO dto) {
        SciencePlan plan = new SciencePlan();
        updateEntityFromDTO(plan, dto);
        plan.setState(PlanStatus.CREATED);
        return plan;
    }

    public static SciencePlanDTO convertToDTO(SciencePlan plan) {
        if (plan == null) return null;

        SciencePlanDTO dto = new SciencePlanDTO();

        dto.setPlanName(plan.getPlanName());
        dto.setFunding(plan.getFunding());
        dto.setObjective(plan.getObjective());
        dto.setStartDate(plan.getStartDate());
        dto.setEndDate(plan.getEndDate());
        dto.setTelescopeSite(plan.getTelescopeSite().name());

        if (plan.getTarget() != null) {
            dto.setTargetName(plan.getTarget().name());
        }

        if (plan.getRequirements() != null) {
            dto.setFileType(plan.getRequirements().getFileType().name());
            dto.setFileQuality(plan.getRequirements().getFileQuality().name());
            dto.setExposure(plan.getRequirements().getExposure());
            dto.setContrast(plan.getRequirements().getContrast());
            dto.setBrightness(plan.getRequirements().getBrightness());
            dto.setSaturation(plan.getRequirements().getSaturation());
        }


        if (plan.getCreator() != null) {
            dto.setCreator(plan.getCreator().getName());
        }

        if (plan.getSubmitter() != null) {
            dto.setSubmitter(plan.getSubmitter().getName());
        }

        return dto;
    }

    public static void updateEntityFromDTO(SciencePlan plan, SciencePlanDTO dto) {
        plan.setPlanName(dto.getPlanName());
        plan.setFunding(dto.getFunding());
        plan.setObjective(dto.getObjective());
        plan.setStartDate(dto.getStartDate());
        plan.setEndDate(dto.getEndDate());
        plan.setLastModified(LocalDateTime.now());

        if (dto.getTelescopeSite() != null) {
            plan.setTelescopeSite(TelescopeSite.valueOf(dto.getTelescopeSite()));
        }

        if (dto.getTargetName() != null) {
            plan.setTarget(StarSystem.CONSTELLATIONS.valueOf(dto.getTargetName()));
        }

        if (plan.getRequirements() == null) {
            plan.setRequirements(new DataProcessingRequirements());
        }

        plan.getRequirements().setFileType(FileType.valueOf(dto.getFileType()));
        plan.getRequirements().setFileQuality(FileQuality.valueOf(dto.getFileQuality()));
        plan.getRequirements().setExposure(dto.getExposure());
        plan.getRequirements().setContrast(dto.getContrast());
        plan.getRequirements().setBrightness(dto.getBrightness());
        plan.getRequirements().setSaturation(dto.getSaturation());
    }
}