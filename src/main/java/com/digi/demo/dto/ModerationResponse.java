package com.digi.demo.dto;

import java.util.List;

public class ModerationResponse {
    private boolean isValid;
    private boolean isFactChecked;
    private int emotionalIntelligence;
    private List<String> violationReasons;
    private float confidence;

    public ModerationResponse() {
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public int getEmotionalIntelligence() {
        return emotionalIntelligence;
    }

    public void setEmotionalIntelligence(int emotionalIntelligence) {
        this.emotionalIntelligence = emotionalIntelligence;
    }

    public List<String> getViolationReasons() {
        return violationReasons;
    }

    public void setViolationReasons(List<String> violationReasons) {
        this.violationReasons = violationReasons;
    }

    public float getConfidence() {
        return confidence;
    }

    public void setConfidence(float confidence) {
        this.confidence = confidence;
    }

    public boolean isFactChecked() {
        return isFactChecked;
    }

    public void setFactChecked(boolean factChecked) {
        isFactChecked = factChecked;
    }
}
