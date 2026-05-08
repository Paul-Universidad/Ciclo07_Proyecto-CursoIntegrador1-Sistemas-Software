package com.medfacil.application.service;

import java.util.Locale;

import org.springframework.stereotype.Service;

import com.medfacil.api.dto.AdviceRequest;
import com.medfacil.api.dto.AdviceResponse;

@Service
public class AdviceServiceImpl implements AdviceService {

    @Override
    public AdviceResponse advice(AdviceRequest request) {
        String topic = request.topic().trim();
        String key = topic.toLowerCase(Locale.ROOT);

        if (matchesUrgent(key)) {
            return new AdviceResponse(
                    topic,
                    "Según lo indicado, podría tratarse de un cuadro que requiere valoración médica urgente. "
                            + "Acude a emergencias o llama a los servicios de salud de tu localidad. "
                            + "Esta aplicación no sustituye la atención profesional.",
                    "rojo",
                    "Síntomas graves — atención urgente");
        }
        if (matchesModerate(key)) {
            String message = switch (key) {
                case "fiebre", "fever" ->
                        "Fiebre persistente o alta merece seguimiento: hidratación, antitérmico solo según prospecto o indicación, "
                                + "y valoración médica si empeora o hay otros síntomas de alarma.";
                case "dolor", "pain" ->
                        "Dolor intenso o que no cede con medidas habituales debe ser evaluado por un profesional; "
                                + "no aumentes dosis por tu cuenta.";
                default ->
                        "Los síntomas descritos pueden requerir consulta pronto (horas o 1–2 días). "
                                + "Si empeoran, busca atención más urgente.";
            };
            return new AdviceResponse(topic, message, "amarillo", "Síntomas moderados — consulta recomendada");
        }

        String message = switch (key) {
            case "ibuprofeno" ->
                    "Los AINE como el ibuprofeno pueden irritar el estómago; suele recomendarse tomarlos con alimentos "
                            + "y no combinar sin indicación médica.";
            case "paracetamol", "acetaminofen" ->
                    "No superes la dosis diaria indicada; evita combinar con otros productos que también contengan paracetamol.";
            default ->
                    "Información educativa: para decisiones sobre tu salud, consulta siempre a un profesional o farmacéutico.";
        };
        return new AdviceResponse(topic, message, "verde", "Información general / síntomas leves");
    }

    private static boolean matchesUrgent(String key) {
        return containsAny(key,
                "pecho",
                "infarto",
                "no respir",
                "ahogo",
                "sangr",
                "desmay",
                "convuls",
                "pérdida de conocimiento",
                "perdida de conocimiento",
                "suicid",
                "intoxicación",
                "intoxicacion",
                "mordedura",
                "quemadura grave",
                "trauma grave",
                "dolor torácico",
                "toracico");
    }

    private static boolean matchesModerate(String key) {
        if (key.contains("fiebre") && (key.contains("alta") || key.contains("39") || key.contains("40"))) {
            return true;
        }
        return containsAny(key,
                "vómito persistente",
                "vomito persistente",
                "dolor intenso",
                "mareo fuerte",
                "desorientación",
                "desorientacion") || key.equals("fiebre") || key.equals("fever") || key.equals("dolor")
                || key.equals("pain");
    }

    private static boolean containsAny(String haystack, String... needles) {
        for (String n : needles) {
            if (haystack.contains(n)) {
                return true;
            }
        }
        return false;
    }
}
