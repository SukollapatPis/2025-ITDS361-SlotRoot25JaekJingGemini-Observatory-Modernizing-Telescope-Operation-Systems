package com.slotjeakjing.backend.Domain.DTO;


import com.slotjeakjing.backend.Enum.TelescopeSite;

import java.time.LocalDateTime;
import java.util.Date;

public class SciencePlanDTO {
    private int id;
    private String planName;
    private double funding;
    private String objective;
    private LocalDateTime  startDate;
    private LocalDateTime endDate;
    private String telescopeSite;
    private String creator;
    private String submitter;

    //StarSystem
    private String targetName;

    // DataProcessingRequirements
    private String fileType;
    private String fileQuality;
    private double exposure;
    private double contrast;
    private double brightness;
    private double saturation;

    public int getId() {return id;}

    public void setId(int id) {this.id = id;}

    public String getSubmitter() {
        return submitter;
    }

    public void setSubmitter(String submitter) {
        this.submitter = submitter;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public double getFunding() {
        return funding;
    }

    public void setFunding(double funding) {
        this.funding = funding;
    }

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public LocalDateTime  getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime  startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime  getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime  endDate) {
        this.endDate = endDate;
    }

    public String getTelescopeSite() {
        return telescopeSite;
    }

    public void setTelescopeSite(String telescopeSite) {
        this.telescopeSite = telescopeSite;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getTargetName() {
        return targetName;
    }

    public void setTargetName(String targetName) {
        this.targetName = targetName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileQuality() {
        return fileQuality;
    }

    public void setFileQuality(String fileQuality) {
        this.fileQuality = fileQuality;
    }

    public double getExposure() {
        return exposure;
    }

    public void setExposure(double exposure) {
        this.exposure = exposure;
    }

    public double getContrast() {
        return contrast;
    }

    public void setContrast(double contrast) {
        this.contrast = contrast;
    }

    public double getBrightness() {
        return brightness;
    }

    public void setBrightness(double brightness) {
        this.brightness = brightness;
    }

    public double getSaturation() {
        return saturation;
    }

    public void setSaturation(double saturation) {
        this.saturation = saturation;
    }
}