package com.pharmly.dto.response;

/** Corrección de un caso clínico: aciertos, ids correctos y explicación. */
public record ResultadoCasoRespuesta(
        Long caseId,
        boolean diagnosisCorrect,
        boolean justificationCorrect,
        Long correctDiagnosisId,
        Long correctJustificationId,
        String explanation) {
}
