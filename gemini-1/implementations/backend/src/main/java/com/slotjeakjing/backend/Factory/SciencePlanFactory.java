package com.slotjeakjing.backend.Factory;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Enum.*;
import com.slotjeakjing.backend.Domain.Model.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

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
        dto.setStartDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
        dto.setEndDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
        dto.setTelescopeSite(plan.getTelescopeSite().name());

        if (plan.getTarget() != null) {
            dto.setTargetName(plan.getTarget().name());
        }

        if (plan.getRequirements() != null) {
            dto.setFileType(plan.getRequirements().getFileType().name());
            dto.setFileQuality(plan.getRequirements().getFileQuality().name());
            dto.setColorType(plan.getRequirements().getColorType().name());
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
        dto.setStartDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
        dto.setEndDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
        plan.setLastModified(LocalDateTime.now());

        if (dto.getTelescopeSite() != null) {
            plan.setTelescopeSite(TelescopeSite.valueOf(dto.getTelescopeSite().toUpperCase()));
        }

        if (dto.getTargetName() != null) {
            plan.setTarget(StarSystem.CONSTELLATIONS.valueOf(dto.getTargetName()));
        }

        if (plan.getRequirements() == null) {
            plan.setRequirements(new DataProcessingRequirements());
        }

        plan.getRequirements().setFileType(FileType.valueOf(dto.getFileType().toUpperCase()));
        plan.getRequirements().setFileQuality(FileQuality.valueOf(dto.getFileQuality().toUpperCase()));
        plan.getRequirements().setColorType(ColorType.valueOf(dto.getColorType().toUpperCase()));
        plan.getRequirements().setExposure(dto.getExposure());
        plan.getRequirements().setContrast(dto.getContrast());
        plan.getRequirements().setBrightness(dto.getBrightness());
        plan.getRequirements().setSaturation(dto.getSaturation());
    }

    private static String capitalizeFirst(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }
}