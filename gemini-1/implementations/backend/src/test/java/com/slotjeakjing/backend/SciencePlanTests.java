package com.slotjeakjing.backend;

import com.slotjeakjing.backend.Application.SciencePlanService;
import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Domain.Model.SciencePlan;
import com.slotjeakjing.backend.Domain.Model.User;
import com.slotjeakjing.backend.Repository.UserRepository;
import com.slotjeakjing.backend.infrastructure.OCS.OCSClient;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SciencePlanTests {

    @Autowired
    private SciencePlanService sciencePlanService;

    @Autowired
    private HttpSession session;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OCSClient ocsClient;

    @Test
    void testStandardFlow() {

        // ===============================
        // เตรียม User
        // ===============================
        User.Astronomer astronomer = new User.Astronomer();
        astronomer.setName("Dr. Smith");
        astronomer.setEmail("smith@test.com");
        astronomer.setPasswd("1234");
        astronomer = userRepository.save(astronomer);

        User.ScienceObserver observer = new User.ScienceObserver();
        observer.setName("Observer Team A");
        observer.setEmail("observer@test.com");
        observer.setPasswd("1234");
        observer = userRepository.save(observer);

        // ===============================
        // STEP 1: CREATE
        // ===============================
        System.out.println(">>> [STEP 1] Create");

        session.setAttribute("currentUser", astronomer);

        SciencePlanDTO dto = new SciencePlanDTO();
        dto.setPlanName("Deep Space Observation");
        dto.setCreator("Dr. Ploy");
        dto.setFunding(1000.0);
        dto.setObjective("Observe distant galaxies");
        dto.setTargetName("Auriga");
        dto.setTelescopeSite("HAWAII");

        LocalDateTime start = LocalDateTime.of(2026, 4, 22, 23, 0, 0);
        LocalDateTime end = LocalDateTime.of(2026, 4, 23, 2, 0, 0);

        dto.setStartDate(Date.from(start.atZone(ZoneId.systemDefault()).toInstant()));
        dto.setEndDate(Date.from(end.atZone(ZoneId.systemDefault()).toInstant()));

        dto.setFileType("JPEG");
        dto.setFileQuality("LOW");
        dto.setColorType("COLOR");
        dto.setBrightness(1.0);
        dto.setContrast(1.0);
        dto.setExposure(1.0);
        dto.setSaturation(1.0);

        SciencePlan plan = sciencePlanService.createPlan(dto);

        assertNotNull(plan);
        int planId = plan.getPlanId();

        printAllOCSPlans("AFTER CREATE");

        // ===============================
        // STEP 2: SUBMIT
        // ===============================
        System.out.println(">>> [STEP 2] Submit");

        sciencePlanService.submitPlan(planId);

        printAllOCSPlans("AFTER SUBMIT");

        // ===============================
        // STEP 3: TEST
        // ===============================
        System.out.println(">>> [STEP 3] Test");

        String result = sciencePlanService.testPlan(planId);

        assertNotNull(result);
        System.out.println("OCS Result: " + result);

        printAllOCSPlans("AFTER TEST");

        // ===============================
        // STEP 4: APPROVE
        // ===============================
        System.out.println(">>> [STEP 4] Approve");

        session.setAttribute("currentUser", observer);

        sciencePlanService.approvePlan(planId);

        printAllOCSPlans("AFTER APPROVE");
    }

    private void printAllOCSPlans(String title) {

        System.out.println("\n========= " + title + " =========");

        ArrayList<edu.gemini.app.ocs.model.SciencePlan> sciencePlans =
                new ArrayList<>(ocsClient.getAllSciencePlans());

        if (sciencePlans.isEmpty()) {
            System.out.println("No plans in OCS");
        }

        for (edu.gemini.app.ocs.model.SciencePlan sp : sciencePlans) {
            System.out.println(sp);
        }

        System.out.println("===============================\n");
    }
}