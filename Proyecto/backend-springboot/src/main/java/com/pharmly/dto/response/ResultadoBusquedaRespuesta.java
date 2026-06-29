package com.pharmly.dto.response;

import java.util.List;

/** Resultado combinado de la búsqueda: medicamentos y dolencias que coinciden. */
public record ResultadoBusquedaRespuesta(
        String query,
        List<MedicamentoRespuesta> medications,
        List<DolenciaRespuesta> ailments) {
}
