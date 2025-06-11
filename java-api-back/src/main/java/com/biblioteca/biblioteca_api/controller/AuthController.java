package com.biblioteca.biblioteca_api.controller;

import com.biblioteca.biblioteca_api.dto.LoginRequest;
import com.biblioteca.biblioteca_api.dto.LoginResponse;
import com.biblioteca.biblioteca_api.dto.RegisterRequest;
import com.biblioteca.biblioteca_api.model.Usuario;
import com.biblioteca.biblioteca_api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegisterRequest registerRequest) {
        // ... (código de registro existente) ...
        try {
            Usuario usuarioRegistrado = authService.registrarUsuario(registerRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- NUEVO ENDPOINT DE LOGIN ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse loginResponse = authService.loginUsuario(loginRequest);
            return ResponseEntity.ok(loginResponse); // Devuelve el token y datos del usuario
        } catch (RuntimeException e) {
            // La RuntimeException "Error: Credenciales inválidas." viene de AuthServiceImpl
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
    @GetMapping("/me")
    public ResponseEntity<?> obtenerUsuarioActual(Authentication authentication) {
        // Este endpoint nos ayudará a ver con qué usuario y roles nos hemos autenticado
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.ok("No hay ningún usuario autenticado.");
        }

        // Creamos un mapa para devolver la información de forma clara
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("username", authentication.getName()); // El 'username' que usamos (correo)
        userInfo.put("authorities", authentication.getAuthorities()); // ¡Esta es la parte más importante!
        userInfo.put("details", authentication.getDetails());

        return ResponseEntity.ok(userInfo);
    }
}