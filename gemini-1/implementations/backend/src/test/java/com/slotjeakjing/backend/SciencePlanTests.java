package com.slotjeakjing.backend;

import com.slotjeakjing.backend.Application.SciencePlanService;
import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Domain.Model.SciencePlan;
import com.slotjeakjing.backend.Domain.Model.User;
import com.slotjeakjing.backend.Repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.ZoneId;
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

    @Test
    void testStandardFlow() {

        // ===============================
        // เตรียม User และ save ลง DB ก่อน
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
        // STEP 1: สร้างแผน
        // ===============================
        System.out.println(">>> [STEP 1] Astronomer: Creating Science Plan");

        session.setAttribute("currentUser", astronomer);

        SciencePlanDTO dto = new SciencePlanDTO();
        dto.setPlanName("Deep Space Observation");
        dto.setCreator("Dr. Smith");
        dto.setFunding(15000.0);
        dto.setObjective("Observe distant galaxies");
        dto.setTargetName("Orion");
        dto.setTelescopeSite("HAWAII");
        // ใน SciencePlanTests.java
        LocalDateTime start = LocalDateTime.of(2026, 5, 1, 10, 0, 0); // 1 May 2026 10:00
        LocalDateTime end = LocalDateTime.of(2026, 5, 10, 10, 0, 0);  // 10 May 2026 10:00

        dto.setStartDate(Date.from(start.atZone(ZoneId.systemDefault()).toInstant()));
        dto.setEndDate(Date.from(end.atZone(ZoneId.systemDefault()).toInstant()));

        dto.setFileType("PNG");
        dto.setFileQuality("LOW");
        dto.setColorType("COLOR");

        dto.setBrightness(1.0);
        dto.setContrast(1.0);
        dto.setExposure(1.0);
        dto.setSaturation(1.0);

        SciencePlan plan = sciencePlanService.createPlan(dto);


        assertNotNull(plan);
        assertTrue(plan.getPlanId() > 0);

        int planId = plan.getPlanId();
        sciencePlanService.submitPlan(planId);
        System.out.println("Plan stored in DB with ID: " + planId);

        // ===============================
        // STEP 3: Test ข้ามการ submit เพราะทำพร้อมการ create
        // ===============================
        System.out.println("\n>>> [STEP 3] Astronomer: Testing plan");

        String result = sciencePlanService.testPlan(planId);

        assertNotNull(result);

        System.out.println("OCS Result: " + result);

        // ===============================
        // STEP 4: Approve
        // ===============================
        System.out.println("\n>>> [STEP 4] Observer Validating");

        session.setAttribute("currentUser", observer);

        sciencePlanService.approvePlan(planId);

        System.out.println("Plan VALIDATED");

    }
}