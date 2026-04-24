package com.slotjeakjing.backend.Controller;

import com.slotjeakjing.backend.Application.SciencePlanService;
import com.slotjeakjing.backend.Domain.DTO.SciencePlanDTO;
import com.slotjeakjing.backend.Domain.Model.SciencePlan;
import com.slotjeakjing.backend.Domain.Model.StarSystem;
import com.slotjeakjing.backend.Enum.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/science-plans")
public class SciencePlanController {

    @Autowired
    private SciencePlanService sciencePlanService;

    @PostMapping
    public ResponseEntity<SciencePlan> createSciencePlan(@RequestBody SciencePlanDTO dto) {
        SciencePlan createdPlan = sciencePlanService.createPlan(dto);
        return ResponseEntity.ok(createdPlan);
    }

    @PutMapping("/{planId}")
    public ResponseEntity<String> updateSciencePlanDetails(@PathVariable int planId, @RequestBody SciencePlanDTO dto) {
        sciencePlanService.updatePlan(planId, dto);
        return ResponseEntity.ok("Science Plan updated successfully");
    }

    @GetMapping("/{planId}")
    public ResponseEntity<SciencePlan> getSciencePlan(@PathVariable int planId) {
        SciencePlan plan = sciencePlanService.getPlanById(planId);
        return ResponseEntity.ok(plan);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SciencePlan>> requestSciencePlanList(@PathVariable int userId) {
        List<SciencePlan> userPlans = sciencePlanService.getPlansByCreator(userId);
        return ResponseEntity.ok(userPlans);
    }

    @GetMapping("/status/{state}")
    public ResponseEntity<List<SciencePlan>> requestSciencePlanList(@PathVariable PlanStatus state) {
        List<SciencePlan> statusPlans = sciencePlanService.getPlansByStatus(state);
        return ResponseEntity.ok(statusPlans);
    }

    @PostMapping("/{planId}/test")
    public ResponseEntity<String> testSciencePlan(@PathVariable int planId) {
        String result = sciencePlanService.testPlan(planId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/{planId}/submit")
    public ResponseEntity<String> submitSciencePlan(@PathVariable int planId) {
        sciencePlanService.submitPlan(planId);
        return ResponseEntity.ok("Science Plan submitted successfully to OCS");
    }

    @PostMapping("/{planId}/validate")
    public ResponseEntity<String> validateSciencePlan(
            @PathVariable int planId,
            @RequestParam boolean result,
            @RequestParam String feedback) {

        if (result) {
            sciencePlanService.approvePlan(planId);
            return ResponseEntity.ok("Science Plan validated and approved");
        } else {
            sciencePlanService.invalidatePlan(planId, feedback);
            return ResponseEntity.ok("Science Plan invalidated with feedback: " + feedback);
        }
    }

    @GetMapping("/metadata/enums")
    public ResponseEntity<Map<String, Object>> getSciencePlanEnums(
            @RequestParam(required = false) List<String> types) {

        Map<String, Object> allEnums = new HashMap<>();

        allEnums.put("telescopeSites", Arrays.stream(TelescopeSite.values()).map(Enum::name).toList());
        allEnums.put("fileTypes", Arrays.stream(FileType.values()).map(Enum::name).toList());
        allEnums.put("fileQualities", Arrays.stream(FileQuality.values()).map(Enum::name).toList());
        allEnums.put("planStatuses", Arrays.stream(PlanStatus.values()).map(Enum::name).toList());
        allEnums.put("targets", Arrays.stream(StarSystem.CONSTELLATIONS.values()).map(Enum::name).toList());
        allEnums.put("PlanStatus", Arrays.stream(PlanStatus.values()).map(Enum::name).toList());

        if (types != null && !types.isEmpty()) {
            Map<String, Object> filteredEnums = new HashMap<>();
            for (String type : types) {
                if (allEnums.containsKey(type)) {
                    filteredEnums.put(type, allEnums.get(type));
                }
            }
            return ResponseEntity.ok(filteredEnums);
        }

        return ResponseEntity.ok(allEnums);
    }
}