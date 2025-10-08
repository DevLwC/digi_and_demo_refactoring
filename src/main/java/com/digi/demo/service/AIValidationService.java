package com.digi.demo.service;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;
import com.digi.demo.dto.ModerationResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.util.*;

@Service
public class AIValidationService {
    private static final Logger logger = LoggerFactory.getLogger(AIValidationService.class);

    @Value("${azure.openai.api-key}")
    private String apiKey;

    @Value("${azure.openai.endpoint}")
    private String endpoint;

    @Value("${azure.openai.deployment}")
    private String deploymentOrModelId;

    private final ObjectMapper objectMapper;
    private List<String> aiValidationGuidelines;

    public AIValidationService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        loadAiValidationGuidelines();
    }

    /**
     * Lädt die Richtlinien für KI-Validierung aus der Datei "AiValidation_Guidelines.txt".
     */
    private void loadAiValidationGuidelines() {
        try {
            Resource resource = new ClassPathResource("AiValidation_Guidelines.txt");
            String content = Files.readString(resource.getFile().toPath());
            aiValidationGuidelines = Arrays.asList(content.split("\n"));
        } catch (IOException e) {
            logger.error("Fehler beim Laden der AI-Validierungsrichtlinien", e);
            aiValidationGuidelines = new ArrayList<>();
        }
    }

    public ModerationResponse validateContent(String userInput) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(apiKey))
                .buildClient();

        String prompt = buildPrompt(userInput);

        try {
            List<ChatRequestMessage> messages = Arrays.asList(
                    new ChatRequestSystemMessage("Du bist ein KI-Moderator für eine politische Social-Media-Plattform. " +
                            "Deine Aufgabe ist es, Inhalte anhand der bereitgestellten AI-Validierungsrichtlinien zu prüfen."),
                    new ChatRequestUserMessage(prompt)
            );

            ChatCompletionsOptions options = new ChatCompletionsOptions(messages)
                    .setTemperature(0.0)
                    .setMaxTokens(800);

            ChatCompletions chatCompletions = client.getChatCompletions(deploymentOrModelId, options);
            String content = chatCompletions.getChoices().get(0).getMessage().getContent();

            return objectMapper.readValue(content, ModerationResponse.class);
        } catch (Exception e) {
            logger.error("Fehler bei der Content-Moderation", e);
            ModerationResponse fallbackResponse = new ModerationResponse();
            fallbackResponse.setValid(false);
            fallbackResponse.setEmotionalIntelligence(0);
            fallbackResponse.setViolationReasons(Collections.singletonList("Fehler bei der Verarbeitung: " + e.getMessage()));
            fallbackResponse.setConfidence(0.0f);
            return fallbackResponse;
        }
    }

    /**
     * Erstellt den Prompt für die KI unter Verwendung der AIValidation_Guidelines.
     */
    private String buildPrompt(String userInput) {
        return String.format("""
                        Analysiere den folgenden Text auf unangemessene Inhalte und bewerte die emotionale Intelligenz.
                        
                        AI-VALIDIERUNGS-RICHTLINIEN:
                        %s
                        
                        TEXT ZUR ANALYSE:
                        %s
                        
                        Antworte ausschließlich im folgenden JSON-Format:
                        {
                            "valid": boolean,
                            "emotionalIntelligence": number (0-100),
                            "violationReasons": [string],
                            "confidence": number (0.0-1.0)
                        }
                        
                        Erklärung der Felder:
                        - valid: true wenn der Text akzeptabel ist, false wenn er Richtlinien verletzt
                        - emotionalIntelligence: Bewertung der emotionalen Intelligenz (0-100)
                        - violationReasons: Liste der Gründe bei Ablehnung
                        - confidence: Konfidenz deiner Bewertung (0.0-1.0)
                        """,
                String.join("\n", aiValidationGuidelines),
                userInput
        );
    }

    public ModerationResponse validateFactAccuracy(String content) {
        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(apiKey))
                .buildClient();

        try {
            List<ChatRequestMessage> messages = Arrays.asList(
                    new ChatRequestSystemMessage("""
                            Du bist ein Faktenprüfer für eine politische Social-Media-Plattform.
                            Deine Aufgabe ist es, Aussagen ausschließlich auf ihre faktische Richtigkeit zu überprüfen.
                            
                            Prüfe dabei:
                            1. Überprüfbare Fakten und Statistiken
                            2. Quellenangaben und deren Seriosität
                            3. Logische Widersprüche und Inkonsistenzen
                            4. Bekannte Falschinformationsmuster
                            5. Aktualität und Kontext der Informationen
                            
                            Ignoriere dabei:
                            - Emotionale Ausdrucksweise
                            - Meinungen und persönliche Ansichten
                            - Stilistische Aspekte
                            """),
                    new ChatRequestUserMessage("""
                            Analysiere den folgenden Text ausschließlich auf Faktengenauigkeit:
                            
                            %s
                            
                            Antworte ausschließlich im folgenden JSON-Format:
                            {
                                "valid": boolean,
                                "violationReasons": [
                                    "Detaillierte Erklärungen zu gefundenen faktischen Unstimmigkeiten"
                                ],
                                "confidence": number (0.0-1.0)
                            }
                            
                            Wobei:
                            - valid: true wenn alle überprüfbaren Fakten korrekt sind, false wenn Falschinformationen gefunden wurden
                            - violationReasons: Liste mit detaillierten Erklärungen zu faktischen Unstimmigkeiten
                            - confidence: Konfidenz in die faktische Bewertung (0.0-1.0)
                            """.formatted(content))
            );

            ChatCompletionsOptions options = new ChatCompletionsOptions(messages)
                    .setTemperature(0.1)
                    .setMaxTokens(1000);

            ChatCompletions chatCompletions = client.getChatCompletions(deploymentOrModelId, options);
            String responseContent = chatCompletions.getChoices().get(0).getMessage().getContent();

            return objectMapper.readValue(responseContent, ModerationResponse.class);
        } catch (Exception e) {
            logger.error("Fehler bei der Faktenprüfung", e);
            ModerationResponse fallbackResponse = new ModerationResponse();
            fallbackResponse.setValid(false);
            fallbackResponse.setViolationReasons(Collections.singletonList("Fehler bei der Faktenprüfung: " + e.getMessage()));
            fallbackResponse.setConfidence(0.0f);
            return fallbackResponse;
        }
    }
}
