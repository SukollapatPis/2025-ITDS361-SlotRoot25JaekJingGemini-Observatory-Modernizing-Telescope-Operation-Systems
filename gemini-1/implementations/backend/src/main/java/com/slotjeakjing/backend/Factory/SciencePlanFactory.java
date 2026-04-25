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
        plan.setLastModified(LocalDateTime.now());

        return plan;
    }

    public static SciencePlanDTO convertToDTO(SciencePlan plan) {
        if (plan == null) return null;

        SciencePlanDTO dto = new SciencePlanDTO();
        dto.setId(plan.getPlanId());
        dto.setPlanName(plan.getPlanName());
        dto.setFunding(plan.getFunding());
        dto.setObjective(plan.getObjective());
        dto.setStatus(plan.getState().name());
        dto.setStartDate(
                plan.getStartDate() != null
                        ? Date.from(plan.getStartDate()
                        .atZone(ZoneId.systemDefault()).toInstant())
                        : null
        );

        dto.setEndDate(
                plan.getEndDate() != null
                        ? Date.from(plan.getEndDate()
                        .atZone(ZoneId.systemDefault()).toInstant())
                        : null
        );

        if (plan.getTelescopeSite() != null) {
            dto.setTelescopeSite(plan.getTelescopeSite().name());
        }

        if (plan.getTarget() != null) {
            dto.setTargetName(plan.getTarget().name());
        }

        DataProcessingRequirements req = plan.getRequirements();
        if (req != null) {

            if (req.getFileType() != null)
                dto.setFileType(req.getFileType().name());

            if (req.getFileQuality() != null)
                dto.setFileQuality(req.getFileQuality().name());

            if (req.getColorType() != null)
                dto.setColorType(req.getColorType().name());

            dto.setExposure(req.getExposure());
            dto.setContrast(req.getContrast());
            dto.setBrightness(req.getBrightness());
            dto.setSaturation(req.getSaturation());
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

        if (dto == null || plan == null) return;

        plan.setPlanName(dto.getPlanName());
        plan.setFunding(dto.getFunding());
        plan.setObjective(dto.getObjective());
        plan.setLastModified(LocalDateTime.now());

        if (dto.getStartDate() != null) {
            plan.setStartDate(
                    dto.getStartDate()
                            .toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDateTime()
            );
        }

        if (dto.getEndDate() != null) {
            plan.setEndDate(
                    dto.getEndDate()
                            .toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDateTime()
            );
        }

        if (dto.getTelescopeSite() != null) {
            try {
                plan.setTelescopeSite(
                        TelescopeSite.valueOf(dto.getTelescopeSite().toUpperCase())
                );
            } catch (Exception e) {
                plan.setTelescopeSite(null);
            }
        }

        if (dto.getTargetName() != null) {
            try {
                plan.setTarget(
                        StarSystem.CONSTELLATIONS.valueOf(dto.getTargetName())
                );
            } catch (Exception e) {
                plan.setTarget(null);
            }
        }

        if (plan.getRequirements() == null) {
            plan.setRequirements(new DataProcessingRequirements());
        }

        DataProcessingRequirements req = plan.getRequirements();

        // ---------- SAFE ENUM MAPPING ----------
        if (dto.getFileType() != null) {
            try {
                req.setFileType(
                        FileType.valueOf(dto.getFileType().toUpperCase())
                );
            } catch (Exception e) {
                req.setFileType(null);
            }
        }

        if (dto.getFileQuality() != null) {
            try {
                req.setFileQuality(
                        FileQuality.valueOf(dto.getFileQuality())
                );
            } catch (Exception e) {
                req.setFileQuality(null);
            }
        }

        if (dto.getColorType() != null) {
            try {
                String color = dto.getColorType().trim();

                if (color.equalsIgnoreCase("Color mode")) {
                    req.setColorType(ColorType.COLOR);
                } else if (color.equalsIgnoreCase("B&W mode")) {
                    req.setColorType(ColorType.BW);
                } else {
                    req.setColorType(ColorType.valueOf(color.toUpperCase()));
                }

            } catch (Exception e) {
                req.setColorType(null);
            }
        }

        req.setExposure(dto.getExposure());
        req.setContrast(dto.getContrast());
        req.setBrightness(dto.getBrightness());
        req.setSaturation(dto.getSaturation());
    }
}