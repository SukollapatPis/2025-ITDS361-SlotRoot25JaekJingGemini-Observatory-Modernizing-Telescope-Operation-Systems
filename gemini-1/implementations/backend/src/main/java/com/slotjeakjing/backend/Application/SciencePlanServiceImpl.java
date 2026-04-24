package com.slotjeakjing.backend.Application;

import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Domain.Model.User;
import com.slotjeakjing.backend.Enum.PlanStatus;
import com.slotjeakjing.backend.Factory.SciencePlanFactory;
import com.slotjeakjing.backend.Domain.Model.SciencePlan;
import com.slotjeakjing.backend.Repository.SciencePlanRepository;
import com.slotjeakjing.backend.infrastructure.OCS.OCSClient;
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

    @Override
    @Transactional
    public SciencePlan createPlan(SciencePlanDTO dto) {
        SciencePlan plan = SciencePlanFactory.createPlan(dto);

        User user = (User) session.getAttribute("currentUser");

        if (user instanceof User.Astronomer astronomer) {
            plan.setCreator(astronomer);
        }

        return repository.save(plan);
    }

    @Override
    @Transactional
    public void updatePlan(int planId, SciencePlanDTO dto) {
        SciencePlan plan = repository.findById(planId)
                .orElseThrow(() -> new NoSuchElementException("ไม่พบแผนงาน ID: " + planId));
        SciencePlanFactory.updateEntityFromDTO(plan, dto);
        repository.save(plan);
    }

    @Override
    public String testPlan(int planId) {
        SciencePlan plan = getPlanById(planId);

        SciencePlanDTO dto = SciencePlanFactory.convertToDTO(plan);

        String result = ocsClient.testPlan(dto);

        return result;
    }

    @Transactional
    public void submitPlan(int planId) {
        SciencePlan plan = getPlanById(planId);
        User user = (User) session.getAttribute("currentUser");

        if (user instanceof User.Astronomer) {
            plan.setSubmitter((User.Astronomer) user);
        }
        plan.setState(PlanStatus.SUBMITTED);
        repository.save(plan);
    }

    @Override
    @Transactional
    public void approvePlan(int planId) {
        SciencePlan plan = getPlanById(planId);
        plan.changeState(PlanStatus.VALIDATED);
        repository.save(plan);
    }

    @Override
    @Transactional
    public void invalidatePlan(int planId, String feedback) {
        SciencePlan plan = getPlanById(planId);
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
                .orElseThrow(() -> new NoSuchElementException("ไม่พบแผนงาน ID: " + planId));
    }

    @Override
    public List<SciencePlan> getPlansByCreator(String userId) {
        return repository.findByCreatorName(userId);
    }

    @Override
    public List<SciencePlan> getPlansByStatus(PlanStatus state) {
        return repository.findByState(state);
    }
}