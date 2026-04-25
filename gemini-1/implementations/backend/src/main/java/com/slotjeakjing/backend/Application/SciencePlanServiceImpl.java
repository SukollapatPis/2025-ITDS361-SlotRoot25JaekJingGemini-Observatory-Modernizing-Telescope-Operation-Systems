package com.slotjeakjing.backend.Application;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Domain.Model.User;
import com.slotjeakjing.backend.Enum.PlanStatus;
import com.slotjeakjing.backend.Factory.SciencePlanFactory;
import com.slotjeakjing.backend.Domain.Model.SciencePlan;
import com.slotjeakjing.backend.Repository.SciencePlanRepository;
import com.slotjeakjing.backend.infrastructure.OCS.OCSClient;
import com.slotjeakjing.backend.infrastructure.security.AccessControlService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SciencePlanServiceImpl implements SciencePlanService {

    @Autowired
    private SciencePlanRepository repository;

    @Autowired
    private HttpSession session;

    @Autowired
    private OCSClient ocsClient;

    @Autowired
    private AccessControlService access;

    @Override
    @Transactional
    public SciencePlan createPlan(SciencePlanDTO dto) {
        validateDates(dto);
        SciencePlan plan = SciencePlanFactory.createPlan(dto);
        User user = (User) session.getAttribute("currentUser");
        if (!access.canCreate(user)) {
            throw new SecurityException("Permission denied");
        }
        plan.setCreator((User.Astronomer) user);
        return repository.save(plan);
    }

    @Override
    @Transactional
    public void updatePlan(int planId, SciencePlanDTO dto) {
        User user = (User) session.getAttribute("currentUser");
        SciencePlan plan = getPlanById(planId);
        if (!access.canUpdate(user, plan)) {
            throw new SecurityException("Permission denied");
        }
        validateDates(dto);
        SciencePlanFactory.updateEntityFromDTO(plan, dto);
        repository.save(plan);
    }

    @Override
    public String testPlan(int planId) {

        SciencePlan plan = getPlanById(planId);

        return ocsClient.testPlan(plan.getOcsPlanNo());
    }

    @Transactional
    public void submitPlan(int planId) {
        User user = (User) session.getAttribute("currentUser");
        SciencePlan plan = getPlanById(planId);
        if (!access.canSubmit(user, plan)) {
            throw new SecurityException("Permission denied");
        }
        plan.setSubmitter((User.Astronomer) user);
        plan.changeState(PlanStatus.SUBMITTED);
        SciencePlanDTO dto = SciencePlanFactory.convertToDTO(plan);
        int ocsPlanNo = ocsClient.submitPlan(dto);
        plan.setOcsPlanNo(ocsPlanNo);
        repository.save(plan);
    }

    @Override
    @Transactional
    public void approvePlan(int planId) {
        User user = (User) session.getAttribute("currentUser");
        SciencePlan plan = getPlanById(planId);
        if (!access.canValidate(user, plan)) {
            throw new SecurityException("Permission denied");
        }
        plan.changeState(PlanStatus.VALIDATED);
        repository.save(plan);
    }

    @Override
    @Transactional
    public void invalidatePlan(int planId, String feedback) {
        User user = (User) session.getAttribute("currentUser");
        SciencePlan plan = getPlanById(planId);
        if (!access.canSubmit(user, plan)) {
            throw new SecurityException("Permission denied");
        }
        plan.changeState(PlanStatus.INVALIDATED);
        repository.save(plan);
    }

    @Override
    public List<SciencePlan> getSubmittedPlans() {
        return repository.findByState(PlanStatus.SUBMITTED);
    }

    @Override
    public SciencePlan getPlanById(int planId) {
        return repository.findById(planId)
                .orElseThrow(() -> new NoSuchElementException("Your selected science plan does not exist."));
    }

    @Override
    public List<SciencePlan> getPlansByCreator(int userId) {
        return repository.findByCreator_Id(userId);
    }

    @Override
    public List<SciencePlan> getPlansByStatus(PlanStatus state) {
        List<SciencePlan> plans = repository.findByState(state);
        if (plans == null || plans.isEmpty()) {
            if (state == PlanStatus.SUBMITTED) {
                throw new RuntimeException(
                        "There are currently no submitted science plans."
                );
            }

            throw new RuntimeException("No science plans found.");
        }
        return plans;
    }

    private void validateDates(SciencePlanDTO dto) {
        if (dto.getStartDate() != null &&
                dto.getEndDate() != null &&
                dto.getStartDate().after(dto.getEndDate())) {

            throw new IllegalArgumentException(
                    "Start date cannot be after the end date"
            );
        }
    }
}