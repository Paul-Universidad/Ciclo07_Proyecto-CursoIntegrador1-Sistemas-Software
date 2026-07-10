package com.pharmly.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotControlador {

    private static final Logger log = LoggerFactory.getLogger(ChatbotControlador.class);

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final String GROQ_API_URL = "https://api.groq.com";

    @PostMapping("/mensaje")
    public ResponseEntity<?> chat(@RequestBody Map<String, String> body) {
        String userMessage = body.get("mensaje");

        if (userMessage == null || userMessage.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El mensaje no puede estar vacío"));
        }

        if (groqApiKey == null || groqApiKey.isBlank()) {
            log.error("GROQ_API_KEY no configurada");
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of("error", "El chatbot no está configurado en el servidor (falta GROQ_API_KEY)"));
        }

        try {
            WebClient client = WebClient.create(GROQ_API_URL);

            Map<?, ?> response = client.post()
                .uri("/openai/v1/chat/completions")
                .header("Authorization", "Bearer " + groqApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(Map.of(
                    "model", "llama-3.1-8b-instant",  // ✅ MODELO ACTUALIZADO
                    "messages", List.of(
                        Map.of("role", "system", "content",
                            "Eres un asistente farmacéutico de Pharmly. " +
                            "Ayudas con dudas sobre medicamentos, dolencias y salud general. " +
                            "Responde siempre en español y de forma concisa."),
                        Map.of("role", "user", "content", userMessage)
                    ),
                    "temperature", 0.7,
                    "max_completion_tokens", 1024
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

            // Extraer el texto de la respuesta de forma segura
            List<?> choices = (List<?>) response.get("choices");
            if (choices == null || choices.isEmpty()) {
                throw new RuntimeException("Respuesta vacía de Groq");
            }

            Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
            Map<?, ?> message = (Map<?, ?>) firstChoice.get("message");
            String reply = (String) message.get("content");

            return ResponseEntity.ok(Map.of("respuesta", reply));

        } catch (WebClientResponseException e) {
            log.error("Error en API Groq: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(Map.of("error", "Error al comunicarse con el servicio de IA"));
        } catch (Exception e) {
            log.error("Error interno en chatbot", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error interno del servidor"));
        }
    }
}