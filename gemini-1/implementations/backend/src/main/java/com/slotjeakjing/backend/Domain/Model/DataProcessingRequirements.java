package com.slotjeakjing.backend.Domain.Model;

import com.slotjeakjing.backend.Enum.ColorType;
import com.slotjeakjing.backend.Enum.FileQuality;
import com.slotjeakjing.backend.Enum.FileType;
import jakarta.persistence.*;

@Entity
@Table(name = "data_processing_requirements")
public class DataProcessingRequirements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private FileType fileType;

    @Enumerated(EnumType.STRING)
    private FileQuality fileQuality;

    @Enumerated(EnumType.STRING)
    private ColorType colorType;

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

    public DataProcessingRequirements() {}

    public DataProcessingRequirements(Long id, FileType fileType, FileQuality fileQuality, ColorType colorType, double exposure, double contrast, double brightness, double saturation) {
        this.id = id;
        this.fileType = fileType;
        this.fileQuality = fileQuality;
        this.colorType = colorType;
        this.exposure = exposure;
        this.contrast = contrast;
        this.brightness = brightness;
        this.saturation = saturation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FileType getFileType() {
        return fileType;
    }

    public void setFileType(FileType fileType) {
        this.fileType = fileType;
    }

    public FileQuality getFileQuality() {
        return fileQuality;
    }

    public void setFileQuality(FileQuality fileQuality) {
        this.fileQuality = fileQuality;
    }

    public ColorType getColorType() {
        return colorType;
    }

    public void setColorType(ColorType colorType) {
        this.colorType = colorType;
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