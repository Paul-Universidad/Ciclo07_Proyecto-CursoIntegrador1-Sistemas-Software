package com.pharmly.service.interfaces;

import com.pharmly.dto.request.SolicitudRegistro;
import com.pharmly.dto.response.UsuarioRespuesta;

public interface UsuariosServicio {

    UsuarioRespuesta login(String username, String password);

    /** Crea una cuenta nueva (solo tipos USUARIO_GENERAL o ESTUDIANTE). */
    UsuarioRespuesta register(SolicitudRegistro solicitud);
}
