package com.biblioteca.biblioteca_api.service;

import com.biblioteca.biblioteca_api.dto.RegisterRequest;
import com.biblioteca.biblioteca_api.model.Usuario;
import com.biblioteca.biblioteca_api.dto.LoginRequest;
import com.biblioteca.biblioteca_api.dto.LoginResponse;


public interface AuthService {
    Usuario registrarUsuario(RegisterRequest registerRequest) throws RuntimeException;
    LoginResponse loginUsuario(LoginRequest loginRequest) throws RuntimeException;
}
