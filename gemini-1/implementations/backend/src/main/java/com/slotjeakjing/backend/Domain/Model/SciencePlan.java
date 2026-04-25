package com.slotjeakjing.backend.Domain.Model;

import com.slotjeakjing.backend.Enum.PlanStatus;
import com.slotjeakjing.backend.Enum.TelescopeSite;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "science_plans")
public class SciencePlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int planId;
    private int ocsPlanNo;

    private String planName;
    private double funding;

    @Column(columnDefinition = "TEXT")
    private String objective;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    private TelescopeSite telescopeSite;

    private LocalDateTime lastModified;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User.Astronomer creator;

    @Enumerated(EnumType.STRING)
    @Column(name = "target_constellation")
    private StarSystem.CONSTELLATIONS target;

    @OneToOne(cascade = CascadeType.ALL)
    private DataProcessingRequirements requirements;

    @Enumerated(EnumType.STRING)
    private PlanStatus state;

    @ManyToOne
    @JoinColumn(name = "submitter_id")
    private User.Astronomer submitter;

    public SciencePlan() {
        this.lastModified = LocalDateTime.now();
        this.state = PlanStatus.CREATED;
    }

    public int getPlanId() {
        return planId;
    }

    public void setPlanId(int planId) {
        this.planId = planId;
    }

    public int getOcsPlanNo() {
        return ocsPlanNo;
    }

    public void setOcsPlanNo(int ocsPlanNo) {
        this.ocsPlanNo = ocsPlanNo;
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

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public TelescopeSite getTelescopeSite() {
        return telescopeSite;
    }

    public void setTelescopeSite(TelescopeSite telescopeSite) {
        this.telescopeSite = telescopeSite;
    }

    public LocalDateTime getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDateTime lastModified) {
        this.lastModified = lastModified;
    }

    public User.Astronomer getCreator() {
        return creator;
    }

    public void setCreator(User.Astronomer creator) {
        this.creator = creator;
    }

    public StarSystem.CONSTELLATIONS getTarget() {
        return target;
    }

    public void setTarget(StarSystem.CONSTELLATIONS target) {
        this.target = target;
    }

    public DataProcessingRequirements getRequirements() {
        return requirements;
    }

    public void setRequirements(DataProcessingRequirements requirements) {
        this.requirements = requirements;
    }

    public PlanStatus getState() {
        return state;
    }

    public void setState(PlanStatus state) {
        this.state = state;
    }

    public User.Astronomer getSubmitter() {
        return submitter;
    }

    public void setSubmitter(User.Astronomer submitter) {
        this.submitter = submitter;
    }

    public void changeState(PlanStatus newState) {
        this.state = newState;
        this.lastModified = LocalDateTime.now();
    }
}