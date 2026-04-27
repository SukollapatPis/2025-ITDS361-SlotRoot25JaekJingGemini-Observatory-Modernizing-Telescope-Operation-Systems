package com.slotjeakjing.backend.Domain.DTO;


import com.slotjeakjing.backend.Enum.TelescopeSite;

import java.time.LocalDateTime;
import java.util.Date;

public class SciencePlanDTO {
    private int id;
    private int ocsPlanNo;
    private String planName;
    private double funding;


    private String objective;
    private Date   startDate;
    private Date  endDate;
    private String telescopeSite;
    private String creator;
    private String submitter;
    private String status;

    //StarSystem
    private String targetName;

    // DataProcessingRequirements
    private String fileType;
    private String fileQuality;
    private String colorType;
    private double exposure;
    private double contrast;
    private double brightness;
    private double saturation;
    private double highlights;
    private double shadows;
    private double whites;
    private double blacks;
    private double luminance;
    private double hue;

    public double getHighlights() {
        return highlights;
    }

    public void setHighlights(double highlights) {
        this.highlights = highlights;
    }

    public double getShadows() {
        return shadows;
    }

    public void setShadows(double shadows) {
        this.shadows = shadows;
    }

    public double getWhites() {
        return whites;
    }

    public void setWhites(double whites) {
        this.whites = whites;
    }

    public double getBlacks() {
        return blacks;
    }

    public void setBlacks(double blacks) {
        this.blacks = blacks;
    }

    public double getLuminance() {
        return luminance;
    }

    public void setLuminance(double luminance) {
        this.luminance = luminance;
    }

    public double getHue() {
        return hue;
    }

    public void setHue(double hue) {
        this.hue = hue;
    }

    public String getColorType() {
        return colorType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getOcsPlanNo() {
        return ocsPlanNo;
    }

    public void setOcsPlanNo(int ocsPlanNo) {
        this.ocsPlanNo = ocsPlanNo;
    }

    public void setColorType(String colorType) {
        this.colorType = colorType;
    }

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

    public Date   getStartDate() {
        return startDate;
    }

    public void setStartDate(Date   startDate) {
        this.startDate = startDate;
    }

    public Date   getEndDate() {
        return endDate;
    }

    public void setEndDate(Date   endDate) {
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