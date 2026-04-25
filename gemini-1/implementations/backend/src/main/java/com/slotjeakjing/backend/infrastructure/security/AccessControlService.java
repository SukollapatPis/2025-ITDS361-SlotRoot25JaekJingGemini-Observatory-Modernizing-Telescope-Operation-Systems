package com.slotjeakjing.backend.infrastructure.security;

import com.slotjeakjing.backend.Domain.Model.SciencePlan;
import com.slotjeakjing.backend.Domain.Model.User;
import com.slotjeakjing.backend.Enum.PlanStatus;
import org.springframework.stereotype.Service;

@Service
public class AccessControlService {
    public boolean canCreate(User user) {
        return user instanceof User.Astronomer;
    }

    public boolean canUpdate(User user, SciencePlan plan) {return user instanceof User.Astronomer; }

    public boolean canSubmit(User user, SciencePlan plan) {
        return user instanceof User.Astronomer && plan.getState() == PlanStatus.TESTED;
    }

    public boolean canTest(User user, SciencePlan plan) {
        return user instanceof User.Astronomer && plan.getState() == PlanStatus.CREATED;
    }

    public boolean canValidate(User user, SciencePlan plan) {
        return user instanceof User.ScienceObserver && plan.getState() == PlanStatus.SUBMITTED;
    }
}
