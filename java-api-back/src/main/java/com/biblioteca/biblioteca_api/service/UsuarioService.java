package com.biblioteca.biblioteca_api.service;

import com.biblioteca.biblioteca_api.model.Usuario;
import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    List<Usuario> obtenerTodosLosUsuarios();
    Optional<Usuario> obtenerUsuarioPorId(Long id);
    Optional<Usuario> obtenerUsuarioPorCorreo(String correo);

}
