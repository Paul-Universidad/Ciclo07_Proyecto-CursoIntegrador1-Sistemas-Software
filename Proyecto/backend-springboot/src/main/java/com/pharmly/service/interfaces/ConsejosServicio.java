package com.pharmly.service.interfaces;

import com.pharmly.dto.request.SolicitudConsejo;
import com.pharmly.dto.response.RespuestaConsejo;

public interface ConsejosServicio {

    RespuestaConsejo evaluar(SolicitudConsejo solicitud);
}
