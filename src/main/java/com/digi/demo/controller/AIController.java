package com.digi.demo.controller;

import com.digi.demo.service.AIValidationService;
import com.digi.demo.dto.ModerationRequest;
import com.digi.demo.dto.ModerationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/moderation")
public class AIController {

    private final AIValidationService aiValidationService;

    @Autowired
    public AIController(AIValidationService aiValidationService) {
        this.aiValidationService = aiValidationService;
    }

    @PostMapping("/validate")
    public ResponseEntity<ModerationResponse> validateContent(@RequestBody ModerationRequest request) {
        try {
            ModerationResponse response = aiValidationService.validateContent(request.getContent());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ModerationResponse errorResponse = new ModerationResponse();
            errorResponse.setValid(false);
            errorResponse.setEmotionalIntelligence(0);
            errorResponse.setViolationReasons(Collections.singletonList("Systemfehler: " + e.getMessage()));
            errorResponse.setConfidence(0.0f);
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @PostMapping("/validate-facts")
    public ResponseEntity<ModerationResponse> validateFactAccuracy(@RequestBody ModerationRequest request) {
        try {
            ModerationResponse response = aiValidationService.validateFactAccuracy(request.getContent());
            response.setEmotionalIntelligence(0); // Setze emotional intelligence auf 0, da nicht relevant für Faktencheck
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ModerationResponse errorResponse = new ModerationResponse();
            errorResponse.setValid(false);
            errorResponse.setViolationReasons(Collections.singletonList("Fehler bei der Faktenprüfung: " + e.getMessage()));
            errorResponse.setConfidence(0.0f);
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}
