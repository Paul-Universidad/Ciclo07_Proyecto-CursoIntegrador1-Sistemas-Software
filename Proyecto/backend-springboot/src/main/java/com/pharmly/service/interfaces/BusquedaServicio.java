package com.pharmly.service.interfaces;

import com.pharmly.dto.response.ResultadoBusquedaRespuesta;

public interface BusquedaServicio {

    /** Busca el texto tanto en medicamentos como en dolencias. */
    ResultadoBusquedaRespuesta search(String query);
}
