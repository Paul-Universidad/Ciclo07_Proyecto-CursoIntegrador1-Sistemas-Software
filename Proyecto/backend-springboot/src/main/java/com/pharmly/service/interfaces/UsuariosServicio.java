package com.pharmly.service.interfaces;

import com.pharmly.dto.response.UsuarioRespuesta;

public interface UsuariosServicio {

    UsuarioRespuesta login(String username, String password);
}
